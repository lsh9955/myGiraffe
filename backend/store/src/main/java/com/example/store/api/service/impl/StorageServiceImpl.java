package com.example.store.api.service.impl;

import com.example.store.api.dto.ImageContentResponse;
import com.example.store.api.service.StorageService;
import com.example.store.db.document.ImageFile;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.FileSystemResource;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RequiredArgsConstructor
@Service
public class StorageServiceImpl implements StorageService {

  private final MongoTemplate mongoTemplate;
  private final String DEFAULT_DIRECTORY_PATH = "/src/img/";

  @Override
  public ImageContentResponse findImageFileByImageId(String imageId) throws IOException {
    // imageId로 이미지를 조회하면서 존재 여부 확인
    var imageFile = Optional
        .ofNullable(mongoTemplate.findOne(
            new Query(Criteria.where("imageId").is(imageId)),
            ImageFile.class,
            "images"))
        .orElseThrow(() -> new IllegalArgumentException("해당 이미지가 없습니다."));

    // 파일 경로
    var imgFilePath = imageFile.getFileSystemPath();

    // ImageContentResponse 로 빌드
    return ImageContentResponse.builder()
        .contentType(Files.probeContentType(Paths.get(imgFilePath)))
        .resource(new FileSystemResource(imgFilePath))
        .build();
  }

  @Override
  public String saveImageFile(MultipartFile multipartFile) throws IOException {

    var stringBuilder = new StringBuilder();

    // 파일시스템에 저장될 파일명 지정 -> {UUID}_{밀리세컨드}.png
    String fileSystemPath = stringBuilder
        .append(DEFAULT_DIRECTORY_PATH)
        .append(UUID.randomUUID())
        .append("_")
        .append(System.currentTimeMillis())
        .append(".png")
        .toString();

    // ImageFile 로 빌드
    // 이미지 ID -> {UUID}_{밀리세컨드} (파일명과는 다름)
    var imageFile = ImageFile.builder()
        .imageId(UUID.randomUUID() + Long.toString(System.currentTimeMillis()))
        .fileSystemPath(fileSystemPath)
        .build();

    // 파일시스템에 저장
    multipartFile.transferTo(new File(fileSystemPath));

    // DB 에 저장하고 ID 반환
    return mongoTemplate.save(imageFile).getImageId();
  }
}
