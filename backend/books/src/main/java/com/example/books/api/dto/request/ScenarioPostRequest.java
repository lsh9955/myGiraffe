package com.example.books.api.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.util.List;
import lombok.Data;

@Data
public class ScenarioPostRequest {
  @NotEmpty(message = "필수 입력 항목입니다.")
  private String title;

  @Positive(message = "필수 입력 항목입니다(양수).")
  @Max(value = Integer.MAX_VALUE, message = "가격 설정 범위를 벗어났습니다.")
  private Integer price;

  private String introScript;

  // 파일 객체는 따로 보내므로 DTO field 에서 제거 예정
//  private MultipartFile introImgUrl;
//
//  private MultipartFile thumbnailImgUrl;

  private List<String> interContents;
}
