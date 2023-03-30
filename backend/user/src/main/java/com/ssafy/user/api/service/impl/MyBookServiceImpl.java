package com.ssafy.user.api.service.impl;

import com.ssafy.user.api.dto.request.MyBookPostRequest;
import com.ssafy.user.api.service.MyBookService;
import com.ssafy.user.db.entity.MyBook;
import com.ssafy.user.db.repository.MyBookRepository;
import com.ssafy.user.db.repository.UserInfoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class MyBookServiceImpl implements MyBookService {

    private final UserInfoRepository userInfoRepository;
    private final MyBookRepository myBookRepository;

    @Override
    public List<MyBook> findAllMyBooksByUserId(String userId) {
        
        // 해당 ID의 유저 존재 유무 확인
        var userInfo = userInfoRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("없는 유저입니다.") );

        // 유저가 소유한 모든 동화책들 조회
        var myBooks = myBookRepository.findAllByUserInfo(userInfo);


        return myBooks;
    }

    @Override
    public MyBook findMyBookById(Integer bookId) {
        // 해당 ID인 동화책
        var mybook = myBookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("없는 동화책 입니다."));

        return mybook;
    }

    @Override
    public Integer saveMyBook(MyBookPostRequest request) throws IOException {

        var userInfo = userInfoRepository.findById(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("없는 유저 입니다."));

        var mybook = MyBook.builder()
                .bookName(request.getBookName())
                .userInfo(userInfo)
                .scenarioId(request.getScenarioId())
                .build();

        return myBookRepository.save(mybook).getBookId();
    }

    @Override
    public void deleteMyBook(Integer bookId) {
        
        myBookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("없는 동화책 입니다."));
        
        myBookRepository.deleteById(bookId);
    }
}
