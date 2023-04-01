package com.ssafy.user.api.dto.response;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.user.db.entity.MyBook;
import com.ssafy.user.db.entity.MyBookPage;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class MyBookPageGetResponse {

    private Integer pageId;

    private Integer bookId;

    private String pageNo;

    private String script;

    private String bgImgUrl;

    private List<String> nextPage;

    private JsonNode objData;

    private JsonNode objUserData;
    // 사용자 상호작용 데이터

    private String interUserImgUrl;

    @Builder
    public MyBookPageGetResponse (MyBookPage myBookPage) {
        this.pageId = myBookPage.getPageId();
        this.bookId = myBookPage.getMyBook().getBookId();
        this.pageNo = myBookPage.getPageNo();
        this.script = myBookPage.getScript();
        this.bgImgUrl = myBookPage.getBgImgUrl();
        this.interUserImgUrl = myBookPage.getInterUserImgUrl();

        // String 형태의 nextPage 를 List 로 변환해서 할당
        // String 형태의 objData 를 JsonNode 객체로 변환해서 할당
        var objectMapper = new ObjectMapper();
        try {
            // String -> List<String>
            this.nextPage = objectMapper.readValue(
                    myBookPage.getNextPage(),
                    objectMapper.getTypeFactory().constructParametricType(List.class, String.class));
            // String -> JsonNode
            this.objData = objectMapper.readTree(myBookPage.getObjData());
            this.objUserData = objectMapper.readTree(myBookPage.getObjUserData());
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
