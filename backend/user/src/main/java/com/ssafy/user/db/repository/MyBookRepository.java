package com.ssafy.user.db.repository;

import com.ssafy.user.db.entity.MyBook;
import com.ssafy.user.db.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MyBookRepository extends JpaRepository<MyBook, Integer> {

    List<MyBook> findAllByUserInfo(UserInfo userId);

}
