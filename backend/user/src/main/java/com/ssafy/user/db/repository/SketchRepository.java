package com.ssafy.user.db.repository;

import com.ssafy.user.db.entity.Sketch;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SketchRepository extends JpaRepository<Sketch, Integer> {

    List<Sketch> findAllByUserId(String userId);

    Optional<Sketch> findBySketchId(Integer sketchId);


}
