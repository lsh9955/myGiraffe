package com.ssafy.user.api.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.user.api.dto.request.DiaryPostRequest;
import com.ssafy.user.api.dto.response.DiaryGetResponse;
import com.ssafy.user.api.dto.response.DiaryGetSimpleResponse;
import com.ssafy.user.api.service.DiaryService;
import com.ssafy.user.api.util.ImageUrlProvider;
import com.ssafy.user.db.entity.Diary;
import com.ssafy.user.db.repository.DiaryRepository;
import com.ssafy.user.db.repository.UserInfoRepository;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RequiredArgsConstructor
@Service
public class DiaryServiceImpl implements DiaryService {

  private final DiaryRepository diaryRepository;
  private final UserInfoRepository userInfoRepository;
  private final ImageUrlProvider imageUrlProvider;
  private final ObjectMapper objectMapper;

  @Override
  public List<DiaryGetSimpleResponse> findAllDiariesByUserId(String userId) {

    var userInfo = userInfoRepository.findById(userId)
        .orElseThrow(() -> new IllegalArgumentException("없는 사용자 입니다."));

    var diaryList = diaryRepository.findAllByUserInfo(userInfo);

    if(diaryList.isEmpty()) {
      return new ArrayList<>();
    }

    return diaryList.stream()
        .map((diary) ->
            DiaryGetSimpleResponse.builder()
                .diaryId(diary.getDiaryId())
                .savedAt(diary.getCreatedAt())
                .diaryImgUrl(diary.getDiaryImgUrl())
                .build())
        .toList();
  }

  @Override
  public DiaryGetResponse findDiaryById(Integer diaryId) {

    // 그림일기 조회와 동시에 검사
    var diary = diaryRepository.findById(diaryId)
        .orElseThrow(() -> new IllegalArgumentException("없는 그림일기 입니다."));

    // JSON 데이터를 변환해서 보내기 위해 DiaryGetResponse 를 build 해서 반환
    return DiaryGetResponse.builder()
        .diary(diary)
        .build();
  }

  @Override
  public Integer saveDiary(String userId, DiaryPostRequest request, MultipartFile diaryImg) throws IOException {

    // 요청을 보낸 유저가 존재하는 지 검사
    var userinfo = userInfoRepository.findById(userId)
        .orElseThrow(() -> new IllegalArgumentException("없는 유저 입니다."));

    // MultipartFile -> String
    var diaryImgUrl = imageUrlProvider.getImageUrl(diaryImg);

    // JSON -> String
    var diaryTrace = objectMapper
        .writerWithDefaultPrettyPrinter()
        .writeValueAsString(request.getDiaryTraceData());

    var diary = Diary.builder()
        .userInfo(userinfo)
        .diaryImgUrl(diaryImgUrl)
        .diaryTraceData(diaryTrace)
        .build();

    return diaryRepository.save(diary).getDiaryId();
  }

  @Override
  public void deleteDiary(Integer diaryId) {

    diaryRepository.findById(diaryId)
        .orElseThrow(() -> new IllegalArgumentException("없는 그림일기 입니다."));

    diaryRepository.deleteById(diaryId);

  }
}
