package com.ssafy.user.api.controller;

import com.ssafy.user.api.dto.request.MyBookPostRequest;
import com.ssafy.user.api.dto.request.MyBookPutRequest;
import com.ssafy.user.api.dto.response.BaseResponseBody;
import com.ssafy.user.api.service.MyBookService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import jakarta.validation.executable.ValidateOnExecution;
import java.io.IOException;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@Slf4j
@Validated
@ValidateOnExecution
@RequiredArgsConstructor
@RestController
@RequestMapping("api/members/books")
public class MyBookController {

  private final MyBookService myBookService;

  @GetMapping("/list")
  public ResponseEntity<? extends BaseResponseBody> getAllMyBooks(
      @RequestHeader("userId") String userId) {

    var myBooks = myBookService.findAllMyBooksByUserId(userId);

    return ResponseEntity
        .ok()
        .body(new BaseResponseBody<>(200, "OK", myBooks));
  }

  @GetMapping("/{bookId}")
  public ResponseEntity<? extends BaseResponseBody> getMyBook(
      @PathVariable("bookId") Integer bookId) {

    var myBook = myBookService.findMyBookById(bookId);

    return ResponseEntity
        .ok()
        .body(new BaseResponseBody<>(200, "OK", myBook));
  }

  @PostMapping
  public ResponseEntity<? extends BaseResponseBody> createMyBook(
      @RequestBody
      @Valid
      MyBookPostRequest myBook,
      @RequestHeader("userId") String userId,
      HttpServletRequest request) throws IOException {

    var id = myBookService.saveMyBook(myBook, userId);

    var location = URI.create(request.getRequestURI() + "/" + id);
    var successMessage = "내 동화책 생성 성공: (ID=" + id + ")";

    return ResponseEntity
        .created(location)
        .body(new BaseResponseBody<>(201, "Created", successMessage));
  }

  @PutMapping
  public ResponseEntity<? extends BaseResponseBody> updateMyBook(
      @RequestBody
      @Valid
      MyBookPutRequest myBook,
      @RequestHeader("userId") String userId) {

    var id = myBookService.updateMyBook(myBook, userId);

    var successMessage = "내 동화책 저장 성공: (ID=" + id + ")";

    return ResponseEntity
        .ok()
        .body(new BaseResponseBody<>(200, "OK", successMessage));
  }

  @DeleteMapping
  public ResponseEntity<? extends BaseResponseBody> deleteMyBook(
      @PathVariable
      @Positive(message = "필수 입력값 입니다(양수).")
      Integer bookId) {

    myBookService.deleteMyBook(bookId);

    var successMessage = "내 동화책 삭제 성공: (ID=" + bookId + ")";

    return ResponseEntity
        .ok()
        .body(new BaseResponseBody<>(200, "OK", successMessage));
  }


}
