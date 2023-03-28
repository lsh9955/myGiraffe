package com.example.books.db.repository;

import com.example.books.db.entity.Page;
import com.example.books.db.entity.Scenario;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PageRepository extends JpaRepository<Page, Integer> {
  Optional<Page> findByScenarioAndPageNo(Scenario scenario, String pageNo);

  List<Page> findAllByScenario(Scenario scenario);
}
