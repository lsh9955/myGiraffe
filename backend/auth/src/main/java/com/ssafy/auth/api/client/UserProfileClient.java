package com.ssafy.auth.api.client;

import com.ssafy.auth.api.dto.UserInfoDto;
import com.ssafy.auth.common.model.BaseResponseBody;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "user-profile-client", url = "j8b201.p.ssafy.io/api/members")
public interface UserProfileClient {
    @PostMapping(produces = "application/json")
    ResponseEntity<? extends BaseResponseBody> insertProfile(@RequestBody UserInfoDto userInfoDto);

    @PatchMapping(value = "/image", produces = "application/json")
    ResponseEntity<? extends BaseResponseBody> updateImage(@RequestBody UserInfoDto userInfoDto);
}
