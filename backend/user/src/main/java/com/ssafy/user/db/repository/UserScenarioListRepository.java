package com.ssafy.user.db.repository;

import com.ssafy.user.db.entity.UserScenarioList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserScenarioListRepository extends JpaRepository<UserScenarioList, Integer> {

    List<UserScenarioList> findAllByUserId(String userId);

}
