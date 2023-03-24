package com.example.books.api.dto.request;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import java.util.List;
import java.util.Map;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class PagePostRequest {

  @Positive(message = "필수 입력값입니다(양수).")
  private Integer scenarioId;

  @Pattern(regexp = "^([1-9]*)-(\\d)*$", message = "'-'으로 구분되어야 합니다 (ex 3-0, 10-2).")
  private String pageNo;


  private String script;

  // 파일 객체는 따로 보내므로 DTO field 에서 제거 예정
//  private MultipartFile bgImgUrl;

  private List<String> nextPage;

  private JsonNode objData;
}
