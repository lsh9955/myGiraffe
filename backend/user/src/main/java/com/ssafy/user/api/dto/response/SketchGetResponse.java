package com.ssafy.user.api.dto.response;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.user.db.entity.Sketch;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Data;

@Data
public class SketchGetResponse {
  private Integer sketchId;

  private LocalDateTime savedAt;

  private String sketchImgUrl;

  private JsonNode sketchTraceData;

  @Builder
  public SketchGetResponse(Sketch sketch) {
    this.sketchId = sketch.getSketchId();
    this.savedAt = sketch.getCreatedAt();
    this.sketchImgUrl = sketch.getSketchImgUrl();

    // String 형태의 sketchTraceData 를 JsonNode 객체로 변환해서 할당
    var objectMapper = new ObjectMapper();
    try {
      this.sketchTraceData = objectMapper
          .readTree(sketch.getSketchTraceData());
    } catch (JsonProcessingException e) {
      throw new RuntimeException(e);
    }
  }
}
