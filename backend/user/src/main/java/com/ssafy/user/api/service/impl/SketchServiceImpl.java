package com.ssafy.user.api.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.user.api.dto.request.SketchPostRequest;
import com.ssafy.user.api.dto.response.SketchGetResponse;
import com.ssafy.user.api.dto.response.SketchGetSimpleResponse;
import com.ssafy.user.api.service.SketchService;
import com.ssafy.user.api.util.ImageUrlProvider;
import com.ssafy.user.db.entity.Sketch;
import com.ssafy.user.db.repository.SketchRepository;
import com.ssafy.user.db.repository.UserInfoRepository;
import com.ssafy.user.exception.BaseRuntimeException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RequiredArgsConstructor
@Service
public class SketchServiceImpl implements SketchService {

  private final SketchRepository sketchRepository;
  private final UserInfoRepository userInfoRepository;
  private final ImageUrlProvider imageUrlProvider;
  private final ObjectMapper objectMapper;

  @Override
  public List<SketchGetSimpleResponse> findSketchesByUserId(String userId) {

    // Token 에 있는 userId 로 userInfo 를 조회하면서 동시에 존재하는지 검사
    var userInfo = userInfoRepository.findById(userId)
        .orElseThrow(() -> new IllegalArgumentException("없는 사용자 입니다."));

    // user 가 가진 스케치북 리스트 조회
    var sketchList = sketchRepository.findAllByUserInfo(userInfo);

    // 스케치북이 없으면 빈 리스트 반환
    if (sketchList.isEmpty()) {
      return new ArrayList<>();
    }

    // 스케치북에서 trace 데이터를 뺀 채로 응답 반환
    return sketchList.stream()
        .map((sketch) ->
            SketchGetSimpleResponse.builder()
                .sketchId(sketch.getSketchId())
                .savedAt(sketch.getCreatedAt())
                .sketchImgUrl(sketch.getSketchImgUrl())
                .build()
        )
        .toList();
  }

  @Override
  public SketchGetResponse findSketchById(Integer sketchId) {

    // 스케치북 조회와 동시에 검사
    var sketch = sketchRepository.findById(sketchId)
        .orElseThrow(() -> new IllegalArgumentException("없는 스케치북 입니다."));

    // JSON 데이터로 변환해서 보내기 위해 SketchGetResponse 를 build 해서 반환
    return SketchGetResponse.builder()
        .sketch(sketch)
        .build();
  }

  @Override
  public Integer saveSketch(String userId, SketchPostRequest request, MultipartFile sketchImg)
      throws IOException {

    // 요청을 보낸 유저가 존재하는 지 검사
    var userInfo = userInfoRepository.findById(userId)
        .orElseThrow(() -> new IllegalArgumentException("없는 사용자 입니다."));

    // MultipartFile -> String
    var sketchImgUrl = imageUrlProvider.getImageUrl(sketchImg);

    // JSON -> String
    var sketchTrace = objectMapper
        .writerWithDefaultPrettyPrinter()
        .writeValueAsString(request.getSketchTraceData());

    // 스케치북 빌드
    var sketch = Sketch.builder()
        .userInfo(userInfo)
        .sketchImgUrl(sketchImgUrl)
        .sketchTraceData(sketchTrace)
        .build();

    // DB 에 저장하고 ID 반환
    return sketchRepository.save(sketch).getSketchId();
  }

  @Override
  public void deleteSketch(Integer sketchId) {

    sketchRepository.findById(sketchId)
        .orElseThrow(() -> new IllegalArgumentException("없는 스케치북 입니다."));

    sketchRepository.deleteById(sketchId);

  }
}
