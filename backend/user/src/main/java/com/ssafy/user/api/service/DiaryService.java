package com.ssafy.user.api.service;

import com.ssafy.user.api.dto.request.DiaryPostRequest;
import com.ssafy.user.api.dto.response.DiaryGetResponse;
import com.ssafy.user.api.dto.response.DiaryGetSimpleResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface DiaryService {

  /**
   * 그림일기 전체 조회
   *
   * @param userId
   * @return 해당 유저의 그림일기들
   */
  List<DiaryGetSimpleResponse> findAllDiariesByUserId(String userId);


  /**
   * 그림일기 하나 조회
   *
   * @param diaryId
   * @return 해당 ID와 일치하는 그림일기
   */
  DiaryGetResponse findDiaryById(Integer diaryId);


  /**
   * 그림일기 저장
   *
   * @param DiaryPostRequest request
   * @return 해당 그림일기 ID
   */
  Integer saveDiary(String userId, DiaryPostRequest request, MultipartFile diaryImg) throws IOException;


  /**
   * 그림일기 삭제
   *
   * @param diaryId
   */
  void deleteDiary(Integer diaryId);


}
