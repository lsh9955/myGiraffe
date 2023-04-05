package com.ssafy.user.api.dto.response;

import com.ssafy.user.db.entity.MyBook;
import com.ssafy.user.db.entity.MyBookPage;
import com.ssafy.user.db.entity.UserInfo;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
public class MyBookGetResponse {

  private Integer bookId;

  private String userId;

  private String bookName;

  private Integer scenarioId;

  private LocalDateTime savedAt;

  private List<MyBookPage> myBookPageList;

  @Builder
  public MyBookGetResponse (MyBook myBook) {
    this.bookId = myBook.getBookId();
    this.userId = myBook.getUserInfo().getUserId();
    this.bookName = myBook.getBookName();
    this.scenarioId = myBook.getScenarioId();
    this.savedAt = myBook.getModifiedAt();
    this.myBookPageList = myBook.getMyBookPageList();
  }
}