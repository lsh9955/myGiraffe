package com.ssafy.user.api.dto.response;

import com.ssafy.user.db.entity.UserInfo;
import lombok.Builder;
import lombok.Data;

@Data
public class UserInfoGetResponse {

    private String userId;

    private String userName;

    private String profileImg;

    private Integer coinAmount;

    @Builder
    public UserInfoGetResponse (UserInfo userInfo) {
        this.userId = userInfo.getUserId();
        this.userName = userInfo.getUserName();
        this.profileImg = userInfo.getProfileImg();
        this.coinAmount = userInfo.getCoinAMount();
    }
}
