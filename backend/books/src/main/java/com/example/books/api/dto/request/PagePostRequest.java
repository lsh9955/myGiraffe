package com.example.books.api.dto.request;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.validation.constraints.Pattern;
import java.util.List;
import java.util.Map;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class PagePostRequest {
  private Integer scenarioId;

  @Pattern(regexp = "^([1-9])-(\\d)$", message = "페이지 번호 형식이 올바르지 않습니다. 페이지 번호 형식은 '-'으로 구분되어야 합니다 (ex 3-0, 10-2).")
  private String pageNo;

  private String script;

  private MultipartFile bgImgUrl;

  private List<String> nextPage;

  private JsonNode objData;
}
