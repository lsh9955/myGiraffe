package com.ssafy.user.api.service.impl;

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
        var userinfo = userInfoRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저 ID 입니다. (ID=" + userId + ")"));

        return UserInfoGetResponse.builder()
                .userInfo(userinfo)
                .build();
    }

    @Override
    public UserInfo updateKeyAmount(String userId, Integer keyAmount) {

        var userinfo = userInfoRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저 ID 입니다. (ID=" + userId + ")"));

        var key = keyAmount; // 변경된 후의 유저 Key 수량
        
        var user = userinfo.toBuilder()
                .coinAMount(key)
                .build();

        return userInfoRepository.save(user);
        
    }
}
