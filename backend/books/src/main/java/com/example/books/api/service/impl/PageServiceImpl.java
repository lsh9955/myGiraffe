package com.example.books.api.service.impl;

import com.example.books.api.dto.request.PagePostRequest;
import com.example.books.api.dto.request.PagePutRequest;
import com.example.books.api.dto.response.PageGetResponse;
import com.example.books.api.service.PageService;
import com.example.books.api.util.ImageUrlProvider;
import com.example.books.db.entity.Page;
import com.example.books.db.repository.PageRepository;
import com.example.books.db.repository.ScenarioRepository;
import com.example.books.exception.BaseRuntimeException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class PageServiceImpl implements PageService {

  private final ScenarioRepository scenarioRepository;
  private final PageRepository pageRepository;
  private final ImageUrlProvider imageUrlProvider;
  private final ObjectMapper objectMapper;

  @Override
  public PageGetResponse findPageByScenarioIdAndPageNo(Integer scenarioId, String pageNo) {

    // 페이지의 시나리오가 존재하는 지 확인
    scenarioRepository.findById(scenarioId)
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 시나리오 ID 입니다. (ID=" + scenarioId + ")"));

    // 페이지 조회와 동시에 존재 여부 검사
    var page =  pageRepository.findByScenarioIdAndPageNo(scenarioId, pageNo)
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 페이지입니다. (page=" + pageNo + ")"));

    // Page 를 PageGetResponse 로 빌드
    return PageGetResponse.builder()
        .page(page)
        .build();
  }

  @Override
  public List<PageGetResponse> findAllPagesByScenarioId(Integer scenarioId) {

    // 페이지의 시나리오가 존재하는 지 확인
    scenarioRepository.findById(scenarioId)
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 시나리오 ID 입니다. (ID=" + scenarioId + ")"));

    // 페이지를 조회하면서 존재 여부 검사
    var pages = pageRepository.findAllByScenarioId(scenarioId);

    // 메인 서비스 컨텐츠인 페이지는 비어있으면 안돼므로 클라이언트에게 알림
    if(pages.isEmpty())
      throw new BaseRuntimeException(HttpStatus.NOT_FOUND, "해당 시나리오에 페이지가 없습니다.");

    // 각 page 들을 PageGetResponse 로 빌드
    return pages.stream()
        .map((page) -> PageGetResponse.builder()
            .page(page)
            .build())
        .toList();
  }

  @Override
  public Integer savePage(PagePostRequest request) throws IOException {

    // 시나리오가 존재하는 지 확인
    var scenario = scenarioRepository.findById(request.getScenarioId())
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 시나리오에 페이지를 추가할 수 없습니다. (ID=" + request.getScenarioId() + ")"));

    // MultiPartFile -> String
    var bgImgUrl = imageUrlProvider.getImageUrl(request.getBgImgUrl());
    // List -> String
    var nextPage = (request.getNextPage() != null) ? Arrays.toString(request.getNextPage().toArray()) : null;
    // JsonNode -> String
    var jsonString = objectMapper.writeValueAsString(request.getObjData());

    // PagePostRequest 를 Page 로 빌드
    var page = Page.builder()
        .scenarioId(scenario)
        .pageNo(request.getPageNo())
        .script(request.getScript())
        .bgImgUrl(bgImgUrl)
        .nextPage(nextPage)
        .objData(jsonString)
        .build();

    // DB 에 저장하고 ID 값을 반환
    return pageRepository.save(page).getPageId();
  }

  @Override
  public Integer updatePage(PagePutRequest request) throws IOException {

    // 시나리오 존재 여부 확인
    var scenario = scenarioRepository.findById(request.getScenarioId())
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 시나리오 ID 입니다."));

    // 페이지 조회와 동시에 존재 여부 검사
    var page =  pageRepository.findById(request.getPageId())
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 페이지입니다.)"));

    // MultiPartFile -> String
    var bgImgUrl = imageUrlProvider.getImageUrl(request.getBgImgUrl());
    // List -> String
    var nextPage = (request.getNextPage() != null) ? Arrays.toString(request.getNextPage().toArray()) : null;
    // JsonNode -> String
    var jsonString = objectMapper.writeValueAsString(request.getObjData());

    // 각 필드에 대해 null 이 아닌 경우 변경, null 이면 변경 X
    // toBuilder()와 리플렉션을 사용해 null 이 아닌 값만 빌드하는 방식도 생각해보기
    var updated = page.toBuilder()
        .pageNo(request.getPageNo() != null ? request.getPageNo() : page.getPageNo())
        .script(request.getScript() != null ? request.getScript() : page.getScript())
        .bgImgUrl(bgImgUrl != null ? bgImgUrl : page.getBgImgUrl())
        .nextPage(nextPage != null ? nextPage : page.getNextPage())
        .objData(jsonString != null ? jsonString : page.getObjData())
        .build();

    // DB 에 저장하고 ID 값을 반환
    return pageRepository.save(updated).getPageId();
  }

  @Override
  public void deletePage(Integer pageId) {
    // 페이지 ID 가 존재하는 지 확인
    pageRepository.findById(pageId)
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 페이지 ID 입니다. (ID=" + pageId + ")"));

    // 페이지 삭제
    pageRepository.deleteById(pageId);
  }
}
