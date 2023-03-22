package com.example.books.api.service;

import com.example.books.api.dto.request.ScenarioPostRequest;
import com.example.books.db.entity.Scenario;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public interface ScenarioService {

  /**
   * 전체 시나리오를 조회합니다.
   * @return 전체 시나리오 목록
   */
  List<Scenario> findAllScenarios();

  /**
   * id를 기준으로 시나리오를 조회합니다.
   * @param id
   * @return 해당 id를 가진 시나리오
   */
  Scenario findScenarioById(Integer id);

  /**
   * 시나리오를 저장합니다.
   * @param
   * @return 생성된 시나리오 ID
   */
  Integer saveScenario(ScenarioPostRequest request);

  /**
   * 시나리오를 삭제합니다.
   * @param scenarioId
   */
  void deleteScenario(Integer scenarioId);
}
