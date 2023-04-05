package com.example.books.api.dto.response;

import com.example.books.db.entity.Scenario;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
public class ScenarioGetResponse {

  private Integer scenarioId;

  private String title;

  private Integer price;

  private String introScript;

  private String introImgUrl;

  private String thumbnailImgUrl;

  private List<String> interContents;

  /**
   * scenario 를 인자로 ResponseDto 를 빌드합니다.
   * 이 builder 는 String 타입으로 저장된 interContents 를
   * List 타입으로 변환하여 저장합니다.
   * @param scenario
   */
  @Builder
  public ScenarioGetResponse(Scenario scenario) {
    this.scenarioId = scenario.getScenarioId();
    this.title = scenario.getTitle();
    this.price = scenario.getPrice();
    this.introScript = scenario.getIntroScript();
    this.introImgUrl = scenario.getIntroImgUrl();
    this.thumbnailImgUrl = scenario.getThumbnailImgUrl();

    // String 형태의 interContents 를 Json 배열로 변환해서 할당
    var objectMapper = new ObjectMapper();
    try {
      this.interContents = objectMapper.readValue(
          scenario.getInterContents(),
          objectMapper.getTypeFactory().constructParametricType(List.class, String.class));
    } catch (JsonProcessingException e) {
      throw new RuntimeException(e);
    }
  }
}
