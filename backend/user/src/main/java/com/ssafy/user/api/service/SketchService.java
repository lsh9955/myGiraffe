package com.ssafy.user.api.service;

import com.ssafy.user.api.dto.request.SketchPostRequest;
import com.ssafy.user.api.dto.response.SketchGetResponse;
import com.ssafy.user.api.dto.response.SketchGetSimpleResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface SketchService {

  /**
   * 스케치북 전체 조회
   * 전체 조회 시에는 손그림 기록이 제외된 데이터를 반환합니다.
   *
   * @param userId 회원 ID
   * @return 해당 ID의 유저 스케치북들
   */
  List<SketchGetSimpleResponse> findSketchesByUserId(String userId);

  /**
   * 스케치북 하나 조회
   *
   * @param sketchId 스케치북 ID
   * @return 해당 스케치
   */
  SketchGetResponse findSketchById(Integer sketchId);

  /**
   * 스케치북을 저장합니다.
   *
   * @param userId 유저 ID
   * @param request 그림 기록 data 를 포함한 dto
   * @param sketchImg 이미지 파일
   * @return 저장된 스케치북의 ID
   * @throws IOException
   */
  Integer saveSketch(String userId, SketchPostRequest request, MultipartFile sketchImg)
      throws IOException;

  /**
   * 스케치북 삭제
   *
   * @param sketchId;
   */
  void deleteSketch(Integer sketchId);
}
