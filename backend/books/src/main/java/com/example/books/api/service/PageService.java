package com.example.books.api.service;

import com.example.books.api.dto.request.PagePostRequest;
import com.example.books.api.dto.request.PagePutRequest;
import com.example.books.api.dto.response.PageGetResponse;
import java.io.IOException;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface PageService {

  /**
   * 시나리오 ID와 페이지 번호를 기준으로 페이지를 조회합니다.
   *
   * @param scenarioId
   * @param pageNo
   * @return 해당 시나리오의 해당 페이지번호를 가진 페이지
   */
  PageGetResponse findPageByScenarioIdAndPageNo(Integer scenarioId, String pageNo);

  /**
   * 시나리오 ID가 가진 전체 페이지를 조회합니다.
   *
   * @param scenarioId
   * @return List<PageGetResponse> 해당 시나리오의 페이지들
   */
  List<PageGetResponse> findAllPagesByScenarioId(Integer scenarioId);

  /**
   * 페이지를 저장합니다.
   *
   * @param pageInfo 페이지 정보
   * @param bgImg 배경화면 이미지
   * @return 저장한 페이지의 ID값
   * @throws IOException
   */
  Integer savePage(PagePostRequest pageInfo, MultipartFile bgImg) throws IOException;

  /**
   * 페이지를 수정합니다.
   *
   * @param pageInfo 페이지 정보
   * @param bgImg 배경화면 이미지
   * @return 수정한 페이지의 ID값
   * @throws IOException
   */
  Integer updatePage(PagePutRequest pageInfo, MultipartFile bgImg) throws IOException;

  /**
   * 페이지를 삭제합니다.
   *
   * @param pageId
   */
  void deletePage(Integer pageId);

}
