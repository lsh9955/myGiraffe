package com.ssafy.user.api.service;

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
     * 결제 모듈 연동을 위한 데이터(거래번호, 식별번호)를 전달합니다.
     * @param PaymentPostRequest request
     * @return 결제를 위한 값을 갖고 있는 JSON? or IMP num?
     */
//    String setIMPCode(PaymentPostRequest request);



}