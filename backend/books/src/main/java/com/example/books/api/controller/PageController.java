package com.example.books.api.controller;

import com.example.books.api.dto.request.PagePostRequest;
import com.example.books.api.service.PageService;
import com.example.books.api.dto.response.BaseResponseBody;
import com.example.books.db.entity.Page;
import com.example.books.db.repository.ScenarioRepository;
import jakarta.validation.constraints.NotBlank;
import java.net.URI;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("api/books/pages")
public class PageController {

  private final ScenarioRepository scenarioRepository;

  private final PageService pageService;

  @GetMapping("/{scenarioId}/{pageNo}")
  public ResponseEntity<Page> getPageByScenarioIdAndPageNo(
      @PathVariable Integer scenarioId,
      @PathVariable String pageNo) {
    return ResponseEntity.ok().body(pageService.findPageByScenarioIdAndPageNo(scenarioId, pageNo));
  }

  @GetMapping("/{scenarioId}")
  public ResponseEntity<List<Page>> findAllPagesByScenarioId(
      @PathVariable Integer scenarioId) {
    var pages = pageService.findAllPagesByScenarioId(scenarioId);
    return ResponseEntity.ok().body(pages);
  }

  @PostMapping
  public ResponseEntity<? extends BaseResponseBody> createPage(
      @RequestBody PagePostRequest page) {
    var id = pageService.savePage(page);
    var location = URI.create("api/books/pages/" + id);
    return ResponseEntity
        .created(location)
        .body(new BaseResponseBody(201, "Created", "페이지 생성 성공: (ID=" + id + ")"));
  }

  @DeleteMapping("/{pageId}")
  public ResponseEntity<? extends BaseResponseBody> deletePage(@NotBlank @PathVariable Integer pageId) {
    pageService.deletePage(pageId);

    return ResponseEntity
        .ok()
        .body(new BaseResponseBody(200, "OK", "페이지가 성공적으로 삭제되었습니다: (ID=" + pageId + ")"));
  }

}
