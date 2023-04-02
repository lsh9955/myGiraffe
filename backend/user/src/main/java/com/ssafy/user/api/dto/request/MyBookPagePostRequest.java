package com.ssafy.user.api.dto.request;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MyBookPagePostRequest {

  @Positive(message = "필수 입력 항목입니다(양수).")
  private Integer bookId;

  @Pattern(regexp = "^(\\d)*-(\\d)*$", message = "'-'으로 구분되어야 합니다 (ex 3-0, 10-2).")
  private String pageNo;

  private String script;

  private List<String> nextPage;

  private Object objData;

  private Object objUserData;
}
