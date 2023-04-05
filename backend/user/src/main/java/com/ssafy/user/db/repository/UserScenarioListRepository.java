package com.ssafy.user.db.repository;

import com.ssafy.user.db.entity.UserInfo;
import com.ssafy.user.db.entity.UserScenarioList;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserScenarioListRepository extends JpaRepository<UserScenarioList, Integer> {

  List<UserScenarioList> findAllByUserInfo(UserInfo userInfo);

}
