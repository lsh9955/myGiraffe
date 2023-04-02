package com.ssafy.user.api.service.impl;

import com.ssafy.user.api.service.UserScenarioListService;
import com.ssafy.user.db.entity.UserScenarioList;
import com.ssafy.user.db.repository.UserInfoRepository;
import com.ssafy.user.db.repository.UserScenarioListRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserScenarioListServiceImpl implements UserScenarioListService {

  private final UserScenarioListRepository userScenarioListRepository;
  private final UserInfoRepository userInfoRepository;

  @Override
  public List<UserScenarioList> findAllScenariosByUserId(String userId) {

    var userInfo = userInfoRepository.findById(userId)
        .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 유저 입니다."));

    var userScenario = userScenarioListRepository.findAllByUserInfo(userInfo);

    return userScenario;
  }

  @Override
  public Integer saveUserScenario(String userId, Integer scenarioId) {

    var userInfo = userInfoRepository.findById(userId)
        .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 유저 입니다."));

      if (scenarioId < 0) {
          throw new IllegalArgumentException("유효하지 않은 시나리오 번호 입니다.");
      }

    var userScenario = UserScenarioList.builder()
        .userInfo(userInfo)
        .scenarioId(scenarioId)
        .build();

    return userScenarioListRepository.save(userScenario).getScenarioId();
  }
}
