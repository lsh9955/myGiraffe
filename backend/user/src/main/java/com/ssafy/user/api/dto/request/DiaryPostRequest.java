package com.ssafy.user.api.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class DiaryPostRequest {

  @NotBlank(message = "필수 항목 입니다.")
  private Object diaryTraceData;
}
