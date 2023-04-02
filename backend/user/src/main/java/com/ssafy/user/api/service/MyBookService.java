package com.ssafy.user.api.service;

import com.ssafy.user.api.dto.request.MyBookPostRequest;
import com.ssafy.user.api.dto.request.MyBookPutRequest;
import com.ssafy.user.db.entity.MyBook;

import java.io.IOException;
import java.util.List;

public interface MyBookService {

  /**
   * 사용자가 소유한 동화책 전체를 조회합니다.
   *
   * @param userId
   * @return 유저가 보유한 동화책들의 리스트
   */
  List<MyBook> findAllMyBooksByUserId(String userId);


  /**
   * 사용자가 소유한 동화책 하나를 조회합니다.
   *
   * @param bookId
   * @return 해당 ID의 보유한 동화책
   */
  MyBook findMyBookById(Integer bookId);


  /**
   * 사용자가 진행할 동화책을 새로 생성합니다.
   *
   * @param MyBookPostRequest request
   * @return 생성된 내 동화책 ID
   */
  Integer saveMyBook(MyBookPostRequest request, String userId);

  /**
   * 사용자가 진행한 동화책을 최종 저장합니다.
   *
   * @param request
   * @return
   */
  Integer updateMyBook(MyBookPutRequest request, String userId);

  /**
   * 사용자가 저장한 동화책 하나를 삭제합니다.
   *
   * @param bookId
   */
  void deleteMyBook(Integer bookId);
}
