package com.ssafy.user.api.service.impl;

import com.ssafy.user.api.dto.request.SketchPostRequest;
import com.ssafy.user.api.service.SketchService;
import com.ssafy.user.api.util.ImageUrlProvider;
import com.ssafy.user.db.entity.Sketch;
import com.ssafy.user.db.repository.SketchRepository;
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
public class SketchServiceImpl implements SketchService {

    private final SketchRepository sketchRepository;
    private final UserInfoRepository userInfoRepository;
    private final ImageUrlProvider imageUrlProvider;

    @Override
    public List<Sketch> findSketchesByUserId(String userId) {

        var userInfo = userInfoRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("없는 사용자 입니다."));

        return sketchRepository.findAllByUserInfo(userInfo);
    }

    @Override
    public Sketch findSketchById(Integer sketchId) {

        return sketchRepository.findById(sketchId)
                .orElseThrow(() -> new IllegalArgumentException("없는 스케치북 입니다."));
    }

    @Override
    public Integer saveSketch(SketchPostRequest request, MultipartFile sketchImg) throws IOException {

        var userInfo = userInfoRepository.findById(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("없는 사용자 입니다."));

        var sketchImgUrl = imageUrlProvider.getImageUrl(sketchImg);

        var sketch = Sketch.builder()
                .sketchName(request.getSketchName())
                .userInfo(userInfo)
                .sketchImgUrl(sketchImgUrl)
                .build();

        return sketchRepository.save(sketch).getSketchId();
    }

    @Override
    public void deleteSketch(Integer sketchId) {

        sketchRepository.findById(sketchId)
                .orElseThrow(() -> new IllegalArgumentException("없는 스케치북 입니다."));

        sketchRepository.deleteById(sketchId);

    }
}
