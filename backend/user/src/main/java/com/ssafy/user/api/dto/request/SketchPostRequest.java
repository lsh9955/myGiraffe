package com.ssafy.user.api.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SketchPostRequest {

  private Object sketchTraceData;
}
