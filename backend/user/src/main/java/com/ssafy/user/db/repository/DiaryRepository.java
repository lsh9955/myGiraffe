package com.ssafy.user.db.repository;

import com.ssafy.user.db.entity.Diary;
import com.ssafy.user.db.entity.UserInfo;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiaryRepository extends JpaRepository<Diary, Integer> {

  List<Diary> findAllByUserInfo(UserInfo userInfo);

}
