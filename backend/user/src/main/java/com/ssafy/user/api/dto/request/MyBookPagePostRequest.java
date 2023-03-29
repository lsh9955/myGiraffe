package com.ssafy.user.api.dto.request;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Data
public class MyBookPagePostRequest {

    @Positive(message = "필수 입력 항목입니다(양수).")
    private Integer bookId;

    @Pattern(regexp = "^([1-9]*)-(\\d)*$", message = "'-'으로 구분되어야 합니다 (ex 3-0, 10-2).")
    private String pageNo;

    private String script;

    private MultipartFile bgImgUrl;

    private List<String> nextPage;

    private JsonNode objData;

    private Map<MultipartFile, JsonNode> objUserData;
}
