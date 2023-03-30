package com.ssafy.user.api.service;

import com.ssafy.user.api.dto.request.MyBookPagePostRequest;
import com.ssafy.user.api.dto.response.MyBookPageGetResponse;

import java.util.List;

public interface MyBookPageService {

    /**
     * 내 동화책 ID 와 페이지 No를 기준으로 페이지를 조회합니다.
     * @param bookId
     * @param pageNo
     * @return 해당 동화책과 페이지 번호를 가진 페이지
     */
    MyBookPageGetResponse findPageByBookIdAndPageNo(Integer bookId, String pageNo);


    /**
     * 내 동화책 ID 를 가진 모든 페이지를 조회합니다.
     *
     * @param bookId
     * @return 해당 내 동화책 페이지들
     */
    List<MyBookPageGetResponse> findAllPagesByBookId(Integer bookId);


    /**
     * 사용자가 수행한 상호작용 정보 포함한 동화책 페이지 정보를 저장합니다.
     * @param MyBookPagePostRequest request
     * @return 해당 내 동화책 pageId
     */
    Integer savePage(MyBookPagePostRequest request);


    /**
     * 해당 내 동화책 페이지 ID를 가진 페이지를 삭제합니다.
     *
     * @param pageId
     */
    void deletePage(Integer pageId);

}
