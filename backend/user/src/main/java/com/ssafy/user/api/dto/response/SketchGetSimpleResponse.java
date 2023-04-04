package com.ssafy.user.api.dto.response;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.user.db.entity.Diary;
import com.ssafy.user.db.entity.Sketch;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class SketchGetSimpleResponse {

  private Integer sketchId;

  private LocalDateTime savedAt;

  private String sketchImgUrl;
}