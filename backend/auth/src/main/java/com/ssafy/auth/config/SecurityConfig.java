package com.ssafy.auth.config;

import com.ssafy.auth.api.sevice.CustomOAuth2UserService;
import com.ssafy.auth.api.sevice.OAuth2SuccessHandler;
import com.ssafy.auth.api.sevice.TokenProvider;
import com.ssafy.auth.common.filter.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@RequiredArgsConstructor
@Configuration
public class SecurityConfig {
    private final CustomOAuth2UserService oAuth2UserService;
    private final OAuth2SuccessHandler successHandler;
    private final TokenProvider tokenProvider;

    @Bean
    public WebSecurityCustomizer configure() {
        return (web) -> web.ignoring()
            .requestMatchers(
                "/favicon.ico",
                "/error",
                "/swagger-resources/**",
                "/swagger-ui/**",
                "/v3/api-docs",
                "/webjars/**"
            )
            .and()
            .ignoring().requestMatchers(PathRequest.toStaticResources().atCommonLocations());    // 정적인 리소스들에 대해서 시큐리티 적용 무시.
    }

    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // cors 설정
        http.cors().configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues())
            .and()
        // REST 방식 사용 -> csrf, form로그인, 세션 무시
            .httpBasic().disable()
                .csrf().disable()
                .formLogin().disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
        // token 검증하는 페이지&메인페이지는 인가 허가, 외엔 모두 인가 필요
                .authorizeRequests()
                .requestMatchers("/token/**").permitAll()
                .requestMatchers("/").permitAll()
                .anyRequest().authenticated()
            .and()
                .oauth2Login()
                .successHandler(successHandler)
                .userInfoEndpoint()
                .userService(oAuth2UserService);

        // http.addFilterBefore(new JwtAuthFilter(tokenProvider), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    /*
    // http.cors().configurationSource(corsConfigurationSource()) 임의 필터
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOrigin("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
    */
}