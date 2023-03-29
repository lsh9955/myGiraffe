package com.example.books.api.service;

import com.example.books.api.dto.request.ScenarioPostRequest;
import com.example.books.api.dto.request.ScenarioPutRequest;
import com.example.books.api.dto.response.ScenarioGetResponse;
import java.io.IOException;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

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
   * @param scenarioInfo 시나리오 정보
   * @param introImg 소개 모달에서 보여줄 이미지파일
   * @param thumbnailImg 동화책 시나리오 썸네일 이미지
   * @return 저장한 시나리오의 ID값
   * @throws IOException
   */
  Integer saveScenario(ScenarioPostRequest scenarioInfo, MultipartFile introImg, MultipartFile thumbnailImg)
      throws IOException;

  /**
   * 시나리오를 수정합니다.
   * @param scenarioInfo 시나리오 정보
   * @param introImg 소개 모달에서 보여줄 이미지파일
   * @param thumbnailImg 동화책 시나리오 썸네일 이미지
   * @return 수정한 시나리오의 ID값
   * @throws IOException
   */
  Integer updateScenario(ScenarioPutRequest scenarioInfo, MultipartFile introImg, MultipartFile thumbnailImg)  throws IOException;

  /**
   * 시나리오를 삭제합니다.
   * @param scenarioId
   */
  void deleteScenario(Integer scenarioId);

}
