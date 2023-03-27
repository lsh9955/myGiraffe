package com.example.books.api.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;
import java.util.List;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ScenarioPostRequest {
  @NotEmpty(message = "필수 입력 항목입니다.")
  private String title;

  @Positive(message = "필수 입력 항목입니다(양수).")
  @Max(value = Integer.MAX_VALUE, message = "가격 설정 범위를 벗어났습니다.")
  private Integer price;

  private String introScript;

  private MultipartFile introImg;

  private MultipartFile thumbnailImg;

  private List<String> interContents;
}
