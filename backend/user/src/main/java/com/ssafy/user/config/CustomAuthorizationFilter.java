package com.ssafy.user.config;

import java.io.IOException;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class CustomAuthorizationFilter extends OncePerRequestFilter {

	@Autowired
	private JwtUtil jwtUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
		if (request.getServletPath().equals("/api/members/user") || request.getServletPath().equals("/api/members/image")) {    // 로그인은 그냥 건너 뛴다
			filterChain.doFilter(request, response);
		}

		String token = request.getHeader("Authorization");   // 헤더의 토큰 파싱 (Bearer 제거)
		try {
			String userId = jwtUtil.getUid(token);
			addAuthorizationHeaders(request, userId);

			Authentication auth = getAuthentication(userId);;
			SecurityContextHolder.getContext().setAuthentication(auth);
		} catch (Exception e) {
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
			response.setContentType(MediaType.APPLICATION_JSON_VALUE);

			Map<String, Object> body = new LinkedHashMap<>();
			body.put("code", HttpStatus.UNAUTHORIZED.value());
			body.put("error", e.getMessage());

			new ObjectMapper().writeValue(response.getOutputStream(), body);
		}

		filterChain.doFilter(request, response);
	}

	// 성공적으로 검증이 되었기 때문에 인증된 헤더로 요청을 변경해준다. 서비스는 해당 헤더에서 아이디를 가져와 사용한다.
	private void addAuthorizationHeaders(HttpServletRequest request, String userId) {
		request.setAttribute("userId", userId);
	}

	public Authentication getAuthentication(String member) {
		return new UsernamePasswordAuthenticationToken(member, "",
			Arrays.asList(new SimpleGrantedAuthority("ROLE_USER")));
	}
}
