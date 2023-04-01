package com.ssafy.user.api.service.impl;

import com.ssafy.user.api.dto.request.DiaryPostRequest;
import com.ssafy.user.api.service.DiaryService;
import com.ssafy.user.api.util.ImageUrlProvider;
import com.ssafy.user.db.entity.Diary;
import com.ssafy.user.db.entity.UserInfo;
import com.ssafy.user.db.repository.DiaryRepository;
import com.ssafy.user.db.repository.UserInfoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class DiaryServiceImpl implements DiaryService {

    private final DiaryRepository diaryRepository;
    private final UserInfoRepository userInfoRepository;
    private final ImageUrlProvider imageUrlProvider;

    @Override
    public List<Diary> findDiariesByUserId(String userId) {

        var userInfo = userInfoRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("없는 사용자 입니다."));

        return diaryRepository.findAllByUserInfo(userInfo); 
    }

    @Override
    public Diary findDiaryById(Integer diaryId) {

        return diaryRepository.findById(diaryId)
                .orElseThrow(() -> new IllegalArgumentException("없는 그림일기 입니다."));
    }

    @Override
    public Integer saveDiary(DiaryPostRequest request, MultipartFile diaryImg) throws IOException {

        var userinfo = userInfoRepository.findById(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("없는 유저 입니다."));

        var diaryImgUrl = imageUrlProvider.getImageUrl(diaryImg);

        var diary = Diary.builder()
                .diaryName(request.getDiaryName())
                .userInfo(userinfo)
                .diaryImgUrl(diaryImgUrl)
                .build();

        return diaryRepository.save(diary).getDiaryId();
    }

    @Override
    public void deleteDiary(Integer diaryId) {

        diaryRepository.findById(diaryId)
                .orElseThrow(() -> new IllegalArgumentException("없는 그림일기 입니다."));

        diaryRepository.deleteById(diaryId);

    }
}
