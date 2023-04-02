package com.ssafy.user.api.dto.request;

import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class MyBookPostRequest {

  @Positive(message = "필수 입력값 입니다.")
  private Integer scenarioId;

}
