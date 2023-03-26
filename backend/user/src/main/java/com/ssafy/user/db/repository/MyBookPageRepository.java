package com.ssafy.user.db.repository;

import com.ssafy.user.db.entity.MyBookPage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MyBookPageRepository extends JpaRepository<MyBookPage, Integer> {
    Optional<MyBookPage> findByBookIdAndPageNo(Integer bookId, String pageNo);

    List<MyBookPage> findAllByBookId(Integer bookId);
}
