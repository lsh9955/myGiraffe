package com.example.books.api.service.impl;

import com.example.books.api.dto.request.ScenarioPostRequest;
import com.example.books.api.dto.request.ScenarioPutRequest;
import com.example.books.api.dto.response.ScenarioGetResponse;
import com.example.books.api.service.ScenarioService;
import com.example.books.api.util.ImageUrlProvider;
import com.example.books.db.entity.Scenario;
import com.example.books.db.repository.ScenarioRepository;
import com.example.books.exception.BaseRuntimeException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RequiredArgsConstructor
@Service
public class ScenarioServiceImpl implements ScenarioService {

  private final ScenarioRepository scenarioRepository;
  private final ImageUrlProvider imageUrlProvider;
  private final ObjectMapper objectMapper;

  @Override
  public List<ScenarioGetResponse> findAllScenarios() {

    // 시나리오 조회
    var scenarios = scenarioRepository.findAll();

    // 메인 서비스 컨텐츠인 시나리오는 비어있으면 안돼므로 클라이언트에게 알림
    if(scenarios.isEmpty()) {
      throw new BaseRuntimeException(HttpStatus.NOT_FOUND, "조회할수 있는 시나리오가 없습니다.");
    }

    // 각 scenario 들을 ScenarioGetResponse 로 빌드
    return scenarios.stream()
        .map((scenario) -> ScenarioGetResponse.builder()
            .scenario(scenario)
            .build())
        .toList();
  }

  @Override
  public ScenarioGetResponse findScenarioById(Integer id) {

    // 시나리오를 조회하면서 존재 여부 검사
   var scenario =  scenarioRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 시나리오 ID 입니다."));

   // scenario 를 ScenarioGetResponse 로 빌드
   return ScenarioGetResponse.builder()
       .scenario(scenario)
       .build();
  }

  @Override
  public Integer saveScenario(ScenarioPostRequest request, MultipartFile introImg,
      MultipartFile thumbnailImg) throws IOException {

    // MultiPartFile -> URL
    var introImgUrl = imageUrlProvider.getImageUrl(introImg);
    // MultiPartFile -> URL
    var thumbnailImgUrl = imageUrlProvider.getImageUrl(thumbnailImg);
    // List<String> -> String
    var interContents = objectMapper.writeValueAsString(request.getInterContents());

    // ScenarioPostRequest 를 Scenario 로 빌드
    var scenario = Scenario.builder()
        .title(request.getTitle())
        .price(request.getPrice())
        .introScript(request.getIntroScript())
        .introImgUrl(introImgUrl)
        .thumbnailImgUrl(thumbnailImgUrl)
        .interContents(interContents)
        .build();

    // DB 에 저장하고 ID 값을 반환
    return scenarioRepository.save(scenario).getScenarioId();
  }

  public Integer updateScenario(
      ScenarioPutRequest request, MultipartFile introImg, MultipartFile thumbnailImg) throws IOException {

    // 시나리오 존재 여부 확인
    var scenario = scenarioRepository.findById(request.getScenarioId())
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 시나리오 ID 입니다."));

    // MultipartFile -> URL
    var introImgUrl = imageUrlProvider.getImageUrl(introImg);
    // MultipartFile -> URL
    var thumbnailImgUrl = imageUrlProvider.getImageUrl(thumbnailImg);
    // List -> String
    var interContents = objectMapper.writeValueAsString(request.getInterContents());

    // 각 필드에 대해 null 이 아닌 경우 변경, null 이면 변경 X
    // toBuilder()와 리플렉션을 사용해 null 이 아닌 값만 빌드하는 방식도 생각해보기
    var updated = scenario.toBuilder()
        .title(Optional.ofNullable(request.getTitle())
            .orElse(scenario.getTitle()))
        .price(Optional.ofNullable(request.getPrice())
            .orElse(scenario.getPrice()))
        .introScript(Optional.ofNullable(request.getIntroScript())
            .orElse(scenario.getIntroScript()))
        .introImgUrl(Optional.ofNullable(introImgUrl)
            .orElse(scenario.getIntroImgUrl()))
        .thumbnailImgUrl(Optional.ofNullable(thumbnailImgUrl)
            .orElse(scenario.getThumbnailImgUrl()))
        .interContents(Optional.ofNullable(interContents)
            .orElse(scenario.getInterContents()))
        .build();

    // DB 에 저장하고 ID 값을 반환
    return scenarioRepository.save(updated).getScenarioId();
  }

  @Override
  public void deleteScenario(Integer scenarioId) {

    // 시나리오 ID 가 존재하는 지 확인
    scenarioRepository.findById(scenarioId)
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 시나리오입니다."));

    // 시나리오 삭제
    scenarioRepository.deleteById(scenarioId);
  }
}
