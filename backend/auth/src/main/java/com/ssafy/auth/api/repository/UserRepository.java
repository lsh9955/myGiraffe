package com.ssafy.auth.api.repository;

import com.ssafy.auth.api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByUserId(UUID userId);
    Optional<User> findBySocialId(String userId);
}
