package com.ssafy.user.api.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.user.api.dto.request.MyBookPagePostRequest;
import com.ssafy.user.api.dto.response.MyBookPageGetResponse;
import com.ssafy.user.api.service.MyBookPageService;
import com.ssafy.user.api.util.ImageUrlProvider;
import com.ssafy.user.db.entity.MyBookPage;
import com.ssafy.user.db.repository.MyBookPageRepository;
import com.ssafy.user.db.repository.MyBookRepository;
import jakarta.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RequiredArgsConstructor
@Service
public class MyBookPageServiceImpl implements MyBookPageService {

  private final MyBookPageRepository myBookPageRepository;
  private final MyBookRepository myBookRepository;
  private final ImageUrlProvider imageUrlProvider;
  private final ObjectMapper objectMapper;

  @Override
  public MyBookPageGetResponse findPageByBookIdAndPageNo(Integer bookId, String pageNo) {

    var myBook = myBookRepository.findById(bookId)
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 동화책 ID 입니다. (ID=" + bookId + ")"));

    var myBookPage = myBookPageRepository.findByMyBookAndPageNo(myBook, pageNo)
        .orElseThrow(
            () -> new IllegalArgumentException("존재하지 않는 페이지 입니다. (page = " + pageNo + ")"));

    return MyBookPageGetResponse.builder()
        .myBookPage(myBookPage)
        .build();
  }

  @Override
  public List<MyBookPageGetResponse> findAllPagesByBookId(Integer bookId) {

    var myBook = myBookRepository.findById(bookId)
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 동화책 입니다. (ID=" + bookId + ")"));

    var myBookPages = myBookPageRepository.findAllByMyBook(myBook);

    return myBookPages.stream()
        .map((myBookPage) -> MyBookPageGetResponse.builder()
            .myBookPage(myBookPage)
            .build())
        .toList();
  }

  @Transactional
  @Override
  public Integer savePage(MyBookPagePostRequest request, MultipartFile bgImg,
      MultipartFile interUserImg) throws IOException {

    var myBook = myBookRepository.findById(request.getBookId())
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 동화책에 페이지를 추가할 수 없습니다. (ID="
            + request.getBookId() + ")"));

    var myBookPages = myBookPageRepository.findAllByMyBook(myBook);

    var savedIndex = Integer.MAX_VALUE;

    // 동화책에 해당 페이지번호가 이미 있으면 그 페이지와 이후에 저장된 페이지들 전부 DB 에서 삭제
    for (int i = 0; i < myBookPages.size(); i++) {
      if (myBookPages.get(i).getPageNo().equals(request.getPageNo())) {
        savedIndex = i;
      } else if (savedIndex > i) {
        continue;
      }
      myBookPageRepository.deleteById(myBookPages.get(i).getPageId());
    }

    // 요청받은 페이지 저장 시작
    // MultiPartFile -> String
    var bgImgUrl = imageUrlProvider.getImageUrl(bgImg);
    var userImgUrl = imageUrlProvider.getImageUrl(interUserImg);

    // List -> String
    var nextPage = objectMapper.writeValueAsString(request.getNextPage());

    // JsonNode -> String
    var dataString = objectMapper.writerWithDefaultPrettyPrinter()
        .writeValueAsString(request.getObjData());
    var userdataString = objectMapper.writerWithDefaultPrettyPrinter()
        .writeValueAsString(request.getObjUserData());

    // Redis 에서 가져와 넣어준다.
    var page = MyBookPage.builder()
        .myBook(myBook)
        .pageNo(request.getPageNo())
        .script(request.getScript())
        .bgImgUrl(bgImgUrl)
        .nextPage(nextPage)
        .objData(dataString)
        .objUserData(userdataString)
        .interUserImgUrl(userImgUrl)
        .build();

    return myBookPageRepository.save(page).getPageId();
  }

  @Override
  public void deletePage(Integer pageId) {
    // 페이지 ID 가 존재하는 지 확인
    myBookPageRepository.findById(pageId)
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 페이지 ID 입니다. (ID=" + pageId + ")"));

    // 페이지 삭제
    myBookPageRepository.deleteById(pageId);
  }
}
