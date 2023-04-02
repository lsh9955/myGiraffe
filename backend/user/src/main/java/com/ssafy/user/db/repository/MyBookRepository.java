package com.ssafy.user.db.repository;

import com.ssafy.user.db.entity.MyBook;
import com.ssafy.user.db.entity.UserInfo;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MyBookRepository extends JpaRepository<MyBook, Integer> {

  List<MyBook> findAllByUserInfo(UserInfo userId);
}
