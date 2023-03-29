package com.ssafy.user.api.controller;

import com.ssafy.user.api.dto.request.DiaryPostRequest;
import com.ssafy.user.api.dto.request.SketchPostRequest;
import com.ssafy.user.api.dto.response.BaseResponseBody;
import com.ssafy.user.api.service.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;
import jakarta.validation.executable.ValidateOnExecution;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URI;

@Slf4j
@Validated
@ValidateOnExecution
@RequiredArgsConstructor
@RestController
@RequestMapping("api/members")
public class UserInfoController {

    private final UserInfoService userInfoService;
    private final UserScenarioListService userScenarioListService;

    @GetMapping("/{userId}")
    public ResponseEntity<? extends BaseResponseBody> getUserInfo(
            @PathVariable("userId")
            @Positive(message = "필수 입력값입니다(양수).") // validation
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
            @PathVariable("userId")
            @NotEmpty(message = "필수 입력값입니다")
            String userId,
            @PathVariable("keyAmount")
            @Positive(message = "필수 입력값입니다(양수).")
            Integer keyAmount) {

        var userinfo = userInfoService.updateKeyAmount(userId, keyAmount);

        return ResponseEntity
                .ok()
                .body(new BaseResponseBody<>(200, "OK", userinfo));

    }




}
