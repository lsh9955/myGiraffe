package com.ssafy.user.db.repository;

import com.ssafy.user.db.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserInfoRepository extends JpaRepository<UserInfo, String> {
    Optional<UserInfo> findByUserId (String userId);

    // 사용자 정보로 보유한 시나리오를 찾으려면 시나리오 DB에 접근 필요!
    // * 유저가 보유한 시나리오 조회
}
