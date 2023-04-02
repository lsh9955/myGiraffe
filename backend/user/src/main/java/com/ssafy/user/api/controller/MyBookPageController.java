package com.ssafy.user.api.controller;

import com.ssafy.user.api.dto.request.MyBookPagePostRequest;
import com.ssafy.user.api.dto.response.BaseResponseBody;
import com.ssafy.user.api.service.MyBookPageService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "*")
@Slf4j
@Validated
@ValidateOnExecution
@RequiredArgsConstructor
@RestController
@RequestMapping("api/members/pages")
public class MyBookPageController {

  private final MyBookPageService myBookPageService;

  @GetMapping("/{bookId}/{pageNo}")
  public ResponseEntity<? extends BaseResponseBody> getPageByBookIdAndPageNo(
      @PathVariable
      @Positive(message = "필수 입력값입니다.")
      Integer bookId,
      @PathVariable
      @NotEmpty(message = "필수 입력값입니다. (ex. 1-0, 3-2)")
      @Pattern(regexp = "^([1-9]*)-(\\d)*$", message = "'-'으로 구분되어야 합니다 (ex 3-0, 10-2).")
      String pageNo) {

    var page = myBookPageService.findPageByBookIdAndPageNo(bookId, pageNo);

    return ResponseEntity
        .ok()
        .body(new BaseResponseBody<>(200, "OK", page));
  }

  @GetMapping("/{bookId}")
  public ResponseEntity<? extends BaseResponseBody> getAllPagesByBookId(
      @PathVariable
      @Positive(message = "필수 입력값입니다(양수).")
      Integer bookId) {

    var pages = myBookPageService.findAllPagesByBookId(bookId);

    return ResponseEntity
        .ok()
        .body(new BaseResponseBody<>(200, "OK", pages));
  }

  @PostMapping
  public ResponseEntity<? extends BaseResponseBody> createPage(
      @RequestPart
      @Valid
      MyBookPagePostRequest myBookPage,
      @RequestPart(required = false)
      MultipartFile bgImg,
      @RequestPart(required = false)
      MultipartFile interUserImg,
      HttpServletRequest request) throws IOException {

    var id = myBookPageService.savePage(myBookPage, bgImg, interUserImg);

    var location = URI.create(request.getRequestURI() + "/" + id);
    var successMessage = "동화책 페이지 생성 성공: (ID=" + id + ")";

    return ResponseEntity
        .created(location)
        .body(new BaseResponseBody<>(201, "Created", successMessage));
  }

  @DeleteMapping("/{pageId}")
  public ResponseEntity<? extends BaseResponseBody> deletePage(
      @Positive(message = "필수 입력값입니다(양수).")
      @PathVariable Integer pageId) {

    myBookPageService.deletePage(pageId);

    var successMessage = "페이지가 성공적으로 삭제되었습니다: (ID=" + pageId + ")";

    return ResponseEntity
        .ok()
        .body(new BaseResponseBody<>(200, "OK", successMessage));
  }
}
