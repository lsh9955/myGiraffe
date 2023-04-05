package com.ssafy.user.api.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class DiaryPostRequest {

  private Object diaryTraceData;
}
