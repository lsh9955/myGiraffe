package com.example.books.api.dto.request;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ScenarioPostRequest {
  @NotNull(message = "제목은 필수 입력 항목입니다.")
  private String title;

  @NotNull(message = "가격의 값이 올바르지 않습니다.")
  private Integer price;

  private String introScript;

  private MultipartFile introImgUrl;

  private MultipartFile thumbnailImgUrl;

  private String interContents;
}
