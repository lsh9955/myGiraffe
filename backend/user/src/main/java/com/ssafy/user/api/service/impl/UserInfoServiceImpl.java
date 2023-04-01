package com.ssafy.user.api.service.impl;

import com.ssafy.user.api.dto.request.UserPostRequest;
import com.ssafy.user.api.dto.response.UserInfoGetResponse;
import com.ssafy.user.api.service.UserInfoService;
import com.ssafy.user.db.entity.UserInfo;
import com.ssafy.user.db.repository.UserInfoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserInfoServiceImpl implements UserInfoService {

    private final UserInfoRepository userInfoRepository;

    @Override
    public UserInfoGetResponse findUserInfoByUserId(String userId) {

        // 유저를 조회하면서 존재 여부 검사
        var userInfo = userInfoRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저 ID 입니다. (ID=" + userId + ")"));

        return UserInfoGetResponse.builder()
                .userInfo(userInfo)
                .build();
    }

    @Override
    public UserInfo updateKeyAmount(String userId, Integer keyAmount) {

        var userInfo = userInfoRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저 ID 입니다. (ID=" + userId + ")"));

        var key = keyAmount; // 변경된 후의 유저 Key 수량
        
        var user = userInfo.toBuilder()
                .coinAMount(key)
                .build();

        return userInfoRepository.save(user);
        
    }

    @Override
    public String saveUserInfo(UserPostRequest request) {

        userInfoRepository.findById(request.getUserId())
                .ifPresent((x) -> {throw new IllegalArgumentException("이미 존재하는 회원입니다.");});

        var userInfo = UserInfo.builder()
                .userId(request.getUserId())
                .userName(request.getNickname())
                .profileImg(request.getImage())
                .build();

        return userInfoRepository.save(userInfo).getUserId();
    }

    @Override
    public String updateUserImage(UserPostRequest request) {

        var userId = userInfoRepository.findById(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("존재 하지 않는 회원입니다."));

        var userInfo = userId.toBuilder()
                .profileImg(request.getImage())
                .build();

        return userInfoRepository.save(userInfo).getUserId();
    }
}
