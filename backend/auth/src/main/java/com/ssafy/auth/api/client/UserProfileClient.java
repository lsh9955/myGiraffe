package com.ssafy.auth.api.client;

import com.ssafy.auth.api.dto.UserInfoDto;
import com.ssafy.auth.common.model.BaseResponseBody;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;

@FeignClient(name = "user-profile-client", url = "${request.url.user-server}")
public interface UserProfileClient {
    @PostMapping(value = "/user",produces = "application/json")
    ResponseEntity<? extends BaseResponseBody> insertProfile(@RequestPart UserInfoDto userInfoDto);

    @PostMapping(value = "/image", produces = "application/json")
    ResponseEntity<? extends BaseResponseBody> updateImage(@RequestPart UserInfoDto userInfoDto);
}
