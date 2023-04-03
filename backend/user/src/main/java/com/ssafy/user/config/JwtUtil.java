package com.ssafy.user.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class JwtUtil {

    private final String secret;

    @Autowired
    public JwtUtil(
            @Value("${jwt.secret}")String secret
    ) {
        this.secret = secret;
    }

    public String getUid(String token) {
        log.info("Jwt Util 생성 getUid()");
        return Jwts.parserBuilder().setSigningKey(secret).build().parseClaimsJws(token).getBody().getSubject();
    }
}
