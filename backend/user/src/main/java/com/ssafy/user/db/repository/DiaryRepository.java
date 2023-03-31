package com.ssafy.user.db.repository;

import com.ssafy.user.db.entity.Diary;
import com.ssafy.user.db.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DiaryRepository extends JpaRepository<Diary, Integer> {

    List<Diary> findAllByUserInfo(UserInfo userInfo);

}
