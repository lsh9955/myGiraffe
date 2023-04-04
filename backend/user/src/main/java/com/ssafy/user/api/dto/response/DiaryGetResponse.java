package com.ssafy.user.api.dto.response;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.user.db.entity.Diary;
import com.ssafy.user.db.entity.UserInfo;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Data;

@Data
public class DiaryGetResponse {

  private Integer diaryId;

  private LocalDateTime savedAt;

  private String diaryImgUrl;

  private JsonNode diaryTraceData;

  @Builder
  public DiaryGetResponse (Diary diary) {
    this.diaryId  = diary.getDiaryId();
    this.savedAt = diary.getCreatedAt();
    this.diaryImgUrl = diary.getDiaryImgUrl();

    // String 형태의 DiaryTraceData 를 JsonNode 객체로 변환해서 할당
    var objectMapper = new ObjectMapper();
    try {
      this.diaryTraceData = objectMapper
          .readTree(diary.getDiaryTraceData());
    } catch (JsonProcessingException e) {
      throw new RuntimeException(e);
    }
  }
}
