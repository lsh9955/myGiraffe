package com.example.books.api.exception.handler;

import com.example.books.api.exception.BaseRuntimeException;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.springframework.web.util.WebUtils;


@ControllerAdvice
public class IllegalArgumentExceptionHandler {

  /**
   * IllegalArgumentException 예외를 내부 서버 에러 (500 Internal Server Error) 이 아닌
   * 클라이언트의 요청 에러 (400 Bad Request)로 표시하기 위해 ExceptionHandler 를 정의했습니다.
   *
   *
   * @param ex IllegalArgumentException
   * @return ProblemDetail (RFC 7807 양식의 ResponseBody)
   */
  @ExceptionHandler(IllegalArgumentException.class)
  public ProblemDetail handleIllegalArgument(IllegalArgumentException ex) {

    return ProblemDetail
        .forStatusAndDetail(
            HttpStatus.BAD_REQUEST,
            ex.getMessage());
  }

}
