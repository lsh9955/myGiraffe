package com.ssafy.user.api.dto.response;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.user.db.entity.Diary;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class DiaryGetSimpleResponse {

  private Integer diaryId;

  private LocalDateTime savedAt;

  private String diaryImgUrl;

  private JsonNode diaryTraceData;
}
