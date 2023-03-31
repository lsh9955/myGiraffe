package com.ssafy.user.api.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class SketchPostRequest {

    @NotBlank(message = "필수 입력 항목입니다.")
    private String userId;

    private String sketchName;

    private String sketchImgUrl;

}
