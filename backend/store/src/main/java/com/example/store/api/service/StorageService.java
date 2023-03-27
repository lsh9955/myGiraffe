package com.example.store.api.service;

import com.example.store.api.dto.ImageContentResponse;
import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;

public interface StorageService {

  /**
   * 이미지 요청 경로에 따라, 해당 이미지 제공에 필요한 정보 DTO인 ImageContentResponse를 반환합니다.
   * @param imageId 이미지 식별자
   * @return ImageContentResponse 해당 이미지 제공에 필요한 정보
   * @throws IOException 파일 가져오기 실패 시
   */
  ImageContentResponse findImageFileByImageId(String imageId) throws IOException;

  /**
   * 이미지를 파일시스템에 저장하고, 이미지 요청 경로를 반환합니다.
   * @param imageFiles MultipartFile 형태의 이미지 파일
   * @return 이미지 요청 경로
   * @throws IOException 파일 저장 실패 시
   */
  String saveImageFile(MultipartFile imageFiles) throws IOException;


}
