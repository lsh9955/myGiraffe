package com.ssafy.user.api.service;

import com.ssafy.user.api.dto.request.SketchPostRequest;
import com.ssafy.user.db.entity.Sketch;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface SketchService {

    /**
     * 스케치북 전체 조회
     * @param userId
     * @return 해당 ID의 유저 스케치북들
     */
    List<Sketch> findSketchesByUserId(String userId);


    /**
     * 스케치북 하나 조회
     * @param sketchId
     * @return 해당 스케치
     */
    Sketch findSketchById(Integer sketchId);


    /**
     * 스케치북 저장
     * @param SketchPostRequest request
     * @return 해당 스케치북 ID
     */
    Integer saveSketch(SketchPostRequest request, MultipartFile sketchImg) throws IOException;


    /**
     * 스케치북 삭제
     * @param sketchId;
     */
    void deleteSketch(Integer sketchId);
}
