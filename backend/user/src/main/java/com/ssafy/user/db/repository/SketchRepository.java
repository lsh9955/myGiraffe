package com.ssafy.user.db.repository;

import com.ssafy.user.db.entity.Sketch;
import com.ssafy.user.db.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SketchRepository extends JpaRepository<Sketch, Integer> {

    List<Sketch> findAllByUserInfo(UserInfo userInfo);

}
