package com.example.books.api.service;

import com.example.books.api.dto.request.PagePostRequest;
import com.example.books.db.entity.Page;
import java.util.List;

public interface PageService {

  /**
   * 시나리오 ID와 페이지 번호를 기준으로 페이지를 조회합니다.
   * @param scenarioId
   * @param pageNo
   * @return 해당 시나리오의 해당 페이지번호를 가진 페이지
   */
  Page findPageByScenarioIdAndPageNo(Integer scenarioId, String pageNo);


  List<Page> findAllPagesByScenarioId(Integer scenarioId);

  Integer savePage(PagePostRequest page);

  void deletePage(Integer pageId);
}
