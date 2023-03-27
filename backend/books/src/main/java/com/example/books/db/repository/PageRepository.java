package com.example.books.db.repository;

import com.example.books.db.entity.Page;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PageRepository extends JpaRepository<Page, Integer> {
  Optional<Page> findByScenarioIdAndPageNo(Integer scenarioId, String pageNo);

  List<Page> findAllByScenarioId(Integer scenarioId);
}
