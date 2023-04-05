package com.ssafy.user.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * 서비스 로직에서 발생하는 RuntimeException 에 대해 Http status 코드를 직접 정의해줄 수 있는 예외 클래스입니다. RuntimeException 을
 * 상속합니다.
 */
@AllArgsConstructor
@Getter
public class BaseRuntimeException extends RuntimeException {

  private HttpStatus httpStatus;

  private RuntimeException exception;

  public BaseRuntimeException(HttpStatus httpStatus, String exceptionMessage) {
    this.httpStatus = httpStatus;
    this.exception = new RuntimeException(exceptionMessage);
  }
}
