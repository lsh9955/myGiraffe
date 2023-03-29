package com.example.books.api.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import java.util.List;
import lombok.Data;

@Data
public class ScenarioPutRequest {

  @Positive(message = "필수 입력 항목입니다.")
  private Integer scenarioId;

  @NotBlank(message = "제목은 비어있지 않은 문자열이어야 합니다.")
  private String title;

  @Min(value = 1, message = "가격 설정 범위를 벗어났습니다.")
  @Max(value = Integer.MAX_VALUE, message = "가격 설정 범위를 벗어났습니다.")
  private Integer price;

  private String introScript;

  private List<String> interContents;
}
