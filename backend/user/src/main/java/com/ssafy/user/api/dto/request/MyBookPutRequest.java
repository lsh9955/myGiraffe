package com.ssafy.user.api.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class MyBookPutRequest {

  @Positive(message = "필수 입력값 입니다.")
  private Integer bookId;

  @NotBlank(message = "필수 입력값입니다.")
  private String bookName;


}
