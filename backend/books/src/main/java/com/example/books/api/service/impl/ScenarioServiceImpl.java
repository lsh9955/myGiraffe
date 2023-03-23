package com.example.books.api.service.impl;

import com.example.books.api.dto.request.ScenarioPostRequest;
import com.example.books.api.exception.BaseRuntimeException;
import com.example.books.api.service.ScenarioService;
import com.example.books.db.entity.Scenario;
import com.example.books.db.repository.ScenarioRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class ScenarioServiceImpl implements ScenarioService {

  private final ScenarioRepository scenarioRepository;

  @Override
  public List<Scenario> findAllScenarios() {
    var scenarios = scenarioRepository.findAll();

    if(scenarios.isEmpty()) {
      throw new BaseRuntimeException(HttpStatus.NOT_FOUND, "조회할수 있는 시나리오가 없습니다.");
    }

    return scenarios;
  }

  @Override
  public Scenario findScenarioById(Integer id) {
    return scenarioRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 시나리오 ID 입니다."));
  }

  @Override
  public Integer saveScenario(ScenarioPostRequest request) {
    log.debug("Scenario received: {}", request.toString());

    // 파일 저장 로직 구성 후 적용 예정
    var introImgUrl = "";
    var thumbnailImgUrl = "";

    var scenario = Scenario.builder()
        .title(request.getTitle())
        .price(request.getPrice())
        .introScript(request.getIntroScript())
        .introImgUrl(introImgUrl)
        .thumbnailImgUrl(thumbnailImgUrl)
        .interContents(null/*Arrays.toString(request.getInterContents().toArray())*/) // JSON 변환 로직 학습 후 적용 예정
        .build();

    var createdId = scenarioRepository.save(scenario).getScenarioId();
    return createdId;
  }

  @Override
  public void deleteScenario(Integer scenarioId) {
    scenarioRepository.findById(scenarioId)
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 시나리오입니다."));

    scenarioRepository.deleteById(scenarioId);
  }

}
