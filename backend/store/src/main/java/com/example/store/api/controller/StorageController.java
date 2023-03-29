package com.example.store.api.controller;

import com.example.store.api.dto.BaseResponseBody;
import com.example.store.api.service.StorageService;
import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.net.URL;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("api/resources/images")
public class StorageController {

  private final StorageService storageService;

  @GetMapping("/{imageId}")
  public ResponseEntity<Object> getImageFile(@PathVariable String imageId) throws IOException {

    var imageFile = storageService.findImageFileByImageId(imageId);

    return ResponseEntity
        .ok()
        .header("Content-Type", imageFile.getContentType())
        .body(imageFile.getResource());
  }

  @PostMapping("/upload")
  public ResponseEntity<Object> createImageFile(@RequestParam MultipartFile imageFile, HttpServletRequest request) throws IOException {

    var imageId = storageService.saveImageFile(imageFile);
    var url = new URL("https://j8b201.p.ssafy.io/api/resources/images/" + imageId);

    return ResponseEntity
        .ofNullable(new BaseResponseBody<>(200, "OK", url));
  }
}
