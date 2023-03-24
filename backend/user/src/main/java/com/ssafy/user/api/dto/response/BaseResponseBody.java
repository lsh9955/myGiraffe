package com.ssafy.user.api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * 응답 컨텐츠에 상태값을 함께 담아서 주기 위해 ResponseBody 에 들어갈 공통 body 양식을 정의한 클래스입니다.
 * 구성 요소는 다음과 같습니다.
 * - status:  상태 코드 넘버 (ex. 200)
 * - naming:  상태 코드 이름
 * - content: 컨텐츠
 *
 * @param <T>
 */
@RequiredArgsConstructor // final 필드만 파라미터로 받는 생성자
@AllArgsConstructor      // 모든 필드값을 파라미터로 받는 생성자
@Getter
public class BaseResponseBody<T> {

    private final Integer status;

    private final String title;

    private T content;

}
