package com.ssafy.user.db.repository;

import com.ssafy.user.db.entity.UserInfo;
import jakarta.persistence.Id;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserinfoRepository extends JpaRepository<UserInfo, Integer> {

}
