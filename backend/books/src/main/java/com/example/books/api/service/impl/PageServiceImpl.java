package com.example.books.api.service.impl;

import com.example.books.api.dto.request.PagePostRequest;
import com.example.books.api.exception.BaseRuntimeException;
import com.example.books.api.service.PageService;
import com.example.books.db.entity.Page;
import com.example.books.db.repository.PageRepository;
import com.example.books.db.repository.ScenarioRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class PageServiceImpl implements PageService {

  private final ScenarioRepository scenarioRepository;

  private final PageRepository pageRepository;

  @Override
  public Page findPageByScenarioIdAndPageNo(Integer scenarioId, String pageNo) {

    scenarioRepository.findById(scenarioId)
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 시나리오 ID 입니다. (ID=" + scenarioId + ")"));

    return pageRepository.findByScenarioIdAndPageNo(scenarioId, pageNo)
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 페이지입니다. (page=" + pageNo + ")"));
  }

  @Override
  public List<Page> findAllPagesByScenarioId(Integer scenarioId) {

    scenarioRepository.findById(scenarioId)
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 시나리오 ID 입니다. (ID=" + scenarioId + ")"));

    var pages = pageRepository.findAllByScenarioId(scenarioId);

    if(pages.isEmpty())
      throw new BaseRuntimeException(HttpStatus.NOT_FOUND, "해당 시나리오에 페이지가 없습니다.");

    return pages;
  }

  @Override
  public Integer savePage(PagePostRequest request) {
    log.debug("Page received: {}", request.toString() );

    // 파일 저장 로직 구현 후 적용 예정
    var bgImgUrl = "http://localhost:9021/abc";

    var scenario = scenarioRepository.findById(request.getScenarioId())
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 시나리오에 페이지를 추가할 수 없습니다. (ID=" + request.getScenarioId() + ")"));

    var page = Page.builder()
        .scenarioId(scenario)
        .pageNo(request.getPageNo())
        .script(request.getScript())
        .bgImgUrl(bgImgUrl)
        .nextPage(/*Arrays.toString(request.getNextPage().toArray())*/null) // JSON 변환 로직 학습 후 적용 예정
        .objData(null)
        .build();

    var createdEntity = pageRepository.save(page);

    log.debug("Saved page => {}", createdEntity);

    return createdEntity.getPageId();
  }

  @Override
  public void deletePage(Integer pageId) {

    pageRepository.findById(pageId)
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 페이지 ID 입니다. (ID=" + pageId + ")"));

    pageRepository.deleteById(pageId);
  }
}
