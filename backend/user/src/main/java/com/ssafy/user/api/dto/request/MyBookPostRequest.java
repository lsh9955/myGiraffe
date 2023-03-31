package com.ssafy.user.api.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class MyBookPostRequest {

    @NotEmpty(message = "필수 입력 항목입니다.")
    private String userId;

    private String bookName;

    @Positive(message = "필수 입력값 입니다.")
    private Integer scenarioId;

}
