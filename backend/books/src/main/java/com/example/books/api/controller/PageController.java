package com.example.books.api.controller;

import com.example.books.api.dto.request.PagePostRequest;
import com.example.books.api.dto.request.PagePutRequest;
import com.example.books.api.dto.response.BaseResponseBody;
import com.example.books.api.service.PageService;
import com.example.books.db.repository.ScenarioRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin
@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("api/books/pages")
public class PageController {

  private final ScenarioRepository scenarioRepository;

  private final PageService pageService;

  @GetMapping("/{scenarioId}/{pageNo}")
  public ResponseEntity<? extends BaseResponseBody> getPageByScenarioIdAndPageNo(
      @PathVariable
      @Positive(message = "필수 입력값입니다.")
      Integer scenarioId,
      @PathVariable
      @NotEmpty(message = "필수 입력값입니다. (ex. 1-0, 3-2)")
      @Pattern(regexp = "^(\\d)*-(\\d)*$", message = "'-'으로 구분되어야 합니다 (ex 3-0, 10-2).")
      String pageNo) {

    var page = pageService.findPageByScenarioIdAndPageNo(scenarioId, pageNo);

    return ResponseEntity
        .ok()
        .body(new BaseResponseBody<>(200, "OK", page));
  }

  @GetMapping("/{scenarioId}")
  public ResponseEntity<? extends BaseResponseBody> getAllPagesByScenarioId(
      @PathVariable
      @Positive(message = "필수 입력값입니다(양수).")
      Integer scenarioId) {

    var pages = pageService.findAllPagesByScenarioId(scenarioId);

    return ResponseEntity
        .ok()
        .body(new BaseResponseBody<>(200, "OK", pages));
  }

  @PostMapping
  public ResponseEntity<? extends BaseResponseBody> createPage(
      @RequestPart @Valid PagePostRequest pageInfo,
      @RequestPart(required = false) MultipartFile bgImg,
      HttpServletRequest request
  ) throws IOException {

    var id = pageService.savePage(pageInfo, bgImg);

    var location = URI.create(request.getRequestURI() + "/" + id);
    var successMessage = "페이지 생성 성공: (ID=" + id + ")";

    return ResponseEntity
        .created(location)
        .body(new BaseResponseBody<>(201, "Created", successMessage));
  }

  @PutMapping
  public ResponseEntity<? extends BaseResponseBody> updatePage(
      @RequestPart @Valid PagePutRequest pageInfo,
      @RequestPart(required = false) MultipartFile bgImg
  ) throws IOException {

    Integer id = pageService.updatePage(pageInfo, bgImg);

    var updateMessage = "페이지 수정 성공: (ID=" + id + ")";

    return ResponseEntity
        .ok()
        .body(new BaseResponseBody<>(200, "OK", updateMessage));
  }

  @DeleteMapping("/{pageId}")
  public ResponseEntity<? extends BaseResponseBody> deletePage(
      @Positive(message = "필수 입력값입니다(양수).")
      @PathVariable Integer pageId) {

    pageService.deletePage(pageId);

    var successMessage = "페이지가 성공적으로 삭제되었습니다: (ID=" + pageId + ")";

    return ResponseEntity
        .ok()
        .body(new BaseResponseBody<>(200, "OK", successMessage));
  }
}
