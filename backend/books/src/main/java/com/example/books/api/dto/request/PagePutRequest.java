package com.example.books.api.dto.request;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import java.util.List;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class PagePutRequest {

  @Positive(message = "필수 입력 항목입니다.")
  private Integer pageId;

  @Positive(message = "필수 입력값입니다(양수).")
  private Integer scenarioId;

  @Pattern(regexp = "^([1-9]*)-(\\d)*$", message = "'-'으로 구분되어야 합니다 (ex 3-0, 10-2).")
  private String pageNo;

  private String script;

  private MultipartFile bgImgUrl;

  private List<String> nextPage;

  private JsonNode objData;
}
