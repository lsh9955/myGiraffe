package com.example.books.db.repository;

import com.example.books.db.entity.Scenario;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScenarioRepository extends JpaRepository<Scenario, Integer> {
  Optional<Scenario> findByTitle(String title);
}
