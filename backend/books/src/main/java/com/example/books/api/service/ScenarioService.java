package com.example.books.api.service;

import com.example.books.api.dto.request.ScenarioPostRequest;
import com.example.books.api.dto.request.ScenarioPutRequest;
import com.example.books.api.dto.response.ScenarioGetResponse;
import java.io.IOException;
import java.util.List;

public interface ScenarioService {

  /**
   * 전체 시나리오를 조회합니다.
   *
   * @return 전체 시나리오 목록
   */
  List<ScenarioGetResponse> findAllScenarios();

  /**
   * id를 기준으로 시나리오를 조회합니다.
   *
   * @param id
   * @return 해당 id를 가진 시나리오
   */
  ScenarioGetResponse findScenarioById(Integer id);

  /**
   * 시나리오를 저장합니다.
   * @param request
   * @return
   * @throws IOException
   */
  Integer saveScenario(ScenarioPostRequest request)
      throws IOException;

  /**
   * 시나리오를 수정합니다.
   * @param request
   * @return
   */
  Integer updateScenario(ScenarioPutRequest request) throws IOException;

  /**
   * 시나리오를 삭제합니다.
   * @param scenarioId
   */
  void deleteScenario(Integer scenarioId);
}
