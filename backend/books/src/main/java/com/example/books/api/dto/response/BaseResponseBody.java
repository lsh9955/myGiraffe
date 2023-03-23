package com.example.books.api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

/**
 * 응답 컨텐츠에 상태값을 함께 담아서 주기 위해 ResponseBody 에 들어갈 공통 body 양식을
 * 정의한 클래스입니다.
 *
 * 구성 요소는 다음과 같습니다.
 * - status:  상태 코드 넘버 (ex. 200)
 * - naming:  상태 코드 이름 (ex. OK)
 * - content: 컨텐츠        (ex. List<Object>)
 *
 * @param <T>
 */
@RequiredArgsConstructor
@AllArgsConstructor
@Getter
public class BaseResponseBody<T> {

  private final Integer status;

  private final String title;

  private T content;

}
