package com.ssafy.user.db.repository;

import com.ssafy.user.db.entity.MyBook;
import com.ssafy.user.db.entity.MyBookPage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MyBookPageRepository extends JpaRepository<MyBookPage, Integer> {
    Optional<MyBookPage> findByMyBookAndPageNo(MyBook myBook, String pageNo);

    List<MyBookPage> findAllByMyBook(MyBook myBook);
}
