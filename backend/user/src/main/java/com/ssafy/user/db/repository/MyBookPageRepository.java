package com.ssafy.user.db.repository;

import com.ssafy.user.db.entity.MyBook;
import com.ssafy.user.db.entity.MyBookPage;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MyBookPageRepository extends JpaRepository<MyBookPage, Integer> {

  Optional<MyBookPage> findByMyBookAndPageNo(MyBook myBook, String pageNo);

  List<MyBookPage> findAllByMyBook(MyBook myBook);
}
