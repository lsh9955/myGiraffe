package com.ssafy.user.api.service;

import com.ssafy.user.db.entity.UserScenarioList;

import java.util.List;

public interface UserScenarioListService {

    /**
     * 유저가 보유한 시나리오를 조회합니다.
     * @param userId
     * @return 해당 유저가 보유한 시나리오들
     */
    List<UserScenarioList> findAllScenariosByUserId(String userId);



    /**
     * 유저가 구매한 시나리오를 목록에 추가(저장)합니다.
     * @param userId, scenarioId
     * @return 해당 시나리오의 ID
     */
    Integer saveUserScenario(String userId, Integer scenarioId);

}
