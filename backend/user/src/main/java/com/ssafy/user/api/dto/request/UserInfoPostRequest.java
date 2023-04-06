package com.ssafy.user.api.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserInfoPostRequest {

  @NotEmpty(message = "필수 입력 항목입니다.")
  private String userId;

  private String nickname;

  private String imageUrl;

}
