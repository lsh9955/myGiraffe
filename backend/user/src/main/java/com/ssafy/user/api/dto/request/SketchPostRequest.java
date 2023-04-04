package com.ssafy.user.api.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SketchPostRequest {

  @NotNull(message = "필수 입력 항목입니다.")
  private Object sketchTraceData;

}
