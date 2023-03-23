package com.example.books.api.exception.handler;

import java.util.ArrayList;
import java.util.List;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ValidationExceptionHandler extends ResponseEntityExceptionHandler {

  /**
   * Validation Error가 발생했을 때 클라이언트에게 위반 내용을 구체적으로 알릴 수 있도록
   * ResponseEntityExceptionHandler.handleMethodArgumentNotValid 메소드를 재정의했습니다.
   *
   * 컨트롤러 중 @Valid 로 Validate 한 내용 중 조건에 맞지 않는 내용이 있을 경우 buildFieldErrorMessage 메소드를 통해 사전에 정의된 메시지
   * 내용만 따로 뽑고, 그 결과를 List<String> 형태로 body 에 담아 클라이언트에게 보여줍니다.
   *
   * @param ex      핸들링하려는 예외인 MethodArgumentNotValidException
   * @param headers 응답에 사용될 헤더
   * @param status  상태 코드
   * @param request 현재 요청
   * @return 제약조건 위반안내 메시지, 위반사항의 개수, 상세 메시지가 담긴 ResponseEntity
   */
  @Override
  protected ResponseEntity<Object> handleMethodArgumentNotValid(
      MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status,
      WebRequest request) {

    var problemDetail = ProblemDetail
        .forStatusAndDetail(
            ex.getStatusCode(),
            "요청의 입력값이 올바르지 않습니다. " + "(개수 " + ex.getBindingResult().getFieldErrors().size() + "개)");

    problemDetail.setTitle("Arguments Not Valid");
    problemDetail.setProperty("errors",
        buildFieldErrorMessage(ex.getBindingResult().getFieldErrors()));

    return handleExceptionInternal(ex, problemDetail, headers, status, request);
  }

  /**
   * Validation 위반 사항에 대한 Error Response 의 가독성을 높이기 위해
   * 위반한 항목과 메시지, 그리고 클라이언트가 입력한 값을 나타내는 메시지를
   * 제작하는 메소드입니다.
   *
   * @param fieldErrors
   * @return 정제된 메시지(String)들을 담은 List
   */
  private List<String> buildFieldErrorMessage(List<FieldError> fieldErrors) {

    StringBuilder builder = new StringBuilder();
    List<String> errorMessages = new ArrayList<>();

    for (FieldError fieldError : fieldErrors) {
      builder.setLength(0);
      builder.append("[");
      builder.append(fieldError.getField());
      builder.append("](은)는 ");
      builder.append(fieldError.getDefaultMessage());
      builder.append(" 입력된 값: [");
      builder.append(fieldError.getRejectedValue());
      builder.append("] ");
      errorMessages.add(builder.toString());
    }

    return errorMessages;
  }
}

