package com.example.books.api.dto.response;

import com.example.books.db.entity.Page;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
public class PageGetResponse {

  private Integer pageId;

  private Integer scenarioId;

  private String pageNo;

  private String script;

  private String bgImgUrl;

  private List<String> nextPage;

  private JsonNode objData;

  @Builder
  public PageGetResponse (Page page) {
    this.pageId = page.getPageId();
    this.scenarioId = page.getScenario().getScenarioId();
    this.pageNo = page.getPageNo();
    this.script = page.getScript();
    this.bgImgUrl = page.getBgImgUrl();

    // String 형태의 nextPage 를 List 로 변환해서 할당
    // String 형태의 objData 를 JsonNode 객체로 변환해서 할당
    var objectMapper = new ObjectMapper();
    try {
      // String -> List<String>
      this.nextPage = objectMapper.readValue(
          page.getNextPage(),
          objectMapper.getTypeFactory().constructParametricType(List.class, String.class));
      // String -> JsonNode
      this.objData = objectMapper.readTree(page.getObjData());
    } catch (JsonProcessingException e) {
      throw new RuntimeException(e);
    }
  }
}
