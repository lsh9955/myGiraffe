package com.ssafy.user.api.service;

import com.ssafy.user.api.dto.request.UserPostRequest;
import com.ssafy.user.api.dto.response.UserInfoGetResponse;
import com.ssafy.user.db.entity.UserInfo;

public interface UserInfoService {

    /**
     * 유저 ID를 통해 유저 정보를 조회합니다.
     *
     * @param userId
     * @return 입력받은 유저 ID를 가진 유저 정보
     */
    UserInfoGetResponse findUserInfoByUserId(String userId);


    /**
     * 유저가 구매/지불한 열쇠를 추가/감소 합니다.
     * @param userId, keyAmount
     * @return UserInfo
     */
    UserInfo updateKeyAmount(String userId, Integer keyAmount);


    /**
     * 유저정보 요청을 받아 저장 합니다.
     * @param UserInfoPostRequest request
     * @return userId
     */
    String saveUserInfo(UserPostRequest request);


    /**
     * 유저의 프로필 사진을 업데이트 합니다.
     * @param UserInfoPostRequest request
     * @return userId
     */
    String updateUserImage(UserPostRequest request);


    /**
     * 결제 모듈 연동을 위한 데이터(거래번호, 식별번호) 요청
     * @param PaymentPostRequest request
     * @return 결제를 위한 값을 갖고 있는 JSON? or IMP num?
     */


}
