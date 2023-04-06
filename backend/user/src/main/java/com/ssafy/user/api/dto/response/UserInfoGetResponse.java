package com.ssafy.user.api.dto.response;

import com.ssafy.user.db.entity.UserInfo;
import lombok.Builder;
import lombok.Data;

@Data
public class UserInfoGetResponse {

  private String userName;

  private String profileImg;

  private Integer coinAmount;

  @Builder
  public UserInfoGetResponse(UserInfo userInfo) {
    this.userName = userInfo.getUserName();
    this.profileImg = userInfo.getProfileImgUrl();
    this.coinAmount = userInfo.getCoinAMount();
  }
}
