package com.ssafy.user.api.controller;

import com.ssafy.user.api.dto.request.UserInfoPostRequest;
import com.ssafy.user.api.dto.response.BaseResponseBody;
import com.ssafy.user.api.service.UserInfoService;
import com.ssafy.user.api.service.UserScenarioListService;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.executable.ValidateOnExecution;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@Validated
@ValidateOnExecution
@RequiredArgsConstructor
@RestController
@RequestMapping("api/members")
public class UserInfoController {

    private final UserInfoService userInfoService;
    private final UserScenarioListService userScenarioListService;

    @PostMapping(value = "/user", produces = "application/json")
    public ResponseEntity<? extends BaseResponseBody> insertProfile(
            @RequestPart UserInfoPostRequest request) {

        // userInfo 주입
        var userInfo = userInfoService.saveUserInfo(request);

        return ResponseEntity
                .ok()
                .body(new BaseResponseBody<>(200, "OK", userInfo));
    };

    @PatchMapping(value = "/image", produces = "application/json")
    public ResponseEntity<? extends BaseResponseBody> updateImage(
            @RequestPart UserInfoPostRequest request) { // 프로필 사진 업데이트

        var userInfo = userInfoService.updateUserImage(request);

        return ResponseEntity
                .ok()
                .body(new BaseResponseBody<>(200, "OK", userInfo));
    };

    @GetMapping("/{userId}")
    public ResponseEntity<? extends BaseResponseBody> getUserInfo(
            @PathVariable("userId")
            @NotBlank(message = "필수 입력값입니다") // validation
            String userId) {

        //UserInfo userInfo
        var userInfo = userInfoService.findUserInfoByUserId(userId);

        return ResponseEntity
                .ok()
                .body(new BaseResponseBody<>(200, "OK", userInfo));
    }

    @GetMapping("/scenarios/{userId}")
    public ResponseEntity<? extends BaseResponseBody> getAllUserScenarios(
            @PathVariable("userId") String userId) {

        var userScenarioList = userScenarioListService.findAllScenariosByUserId(userId);

        return ResponseEntity
                .ok()
                .body(new BaseResponseBody<>(200, "OK", userScenarioList));
    }

    @PatchMapping
    public ResponseEntity<? extends BaseResponseBody> updateUserKey(
            @RequestPart Map<String, Object> param) {

        String userId = (String) param.get("userId");
        Integer keyAmount = (Integer) param.get("keyAmount");

        var userinfo = userInfoService.updateKeyAmount(userId, keyAmount);

        var successMessage = "유저 키 수량 변경 성공: (ID=" + userinfo.getUserId()
                + " : " + userinfo.getCoinAMount() + ")";

        return ResponseEntity
                .ok()
                .body(new BaseResponseBody<>(200, "OK", successMessage));

    }

    @PostMapping
    public ResponseEntity<? extends BaseResponseBody> insertScenario(
            @RequestPart Map<String, Object> param) {

        String userId = (String) param.get("userId");
        Integer scenarioId = (Integer) param.get("scenarioId");

        var userScenario = userScenarioListService.saveUserScenario(userId, scenarioId);

        var successMessage = "시나리오 추가 성공: (ID=" + userScenario + ")";

        return ResponseEntity
                .ok()
                .body(new BaseResponseBody<>(201, "Created", successMessage));
    }




}
