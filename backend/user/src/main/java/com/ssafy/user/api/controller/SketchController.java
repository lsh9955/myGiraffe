package com.ssafy.user.api.controller;

import com.ssafy.user.api.dto.request.SketchPostRequest;
import com.ssafy.user.api.dto.response.BaseResponseBody;
import com.ssafy.user.api.service.SketchService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import jakarta.validation.executable.ValidateOnExecution;
import java.io.IOException;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin
@Slf4j
@Validated
@ValidateOnExecution
@RequiredArgsConstructor
@RestController
@RequestMapping("api/members/sketch")
public class SketchController {

  private final SketchService sketchService;

  @GetMapping("/list")
  public ResponseEntity<? extends BaseResponseBody> getSketches(
      @RequestHeader("userId") String userId) {

    var sketches = sketchService.findSketchesByUserId(userId);

    return ResponseEntity
        .ok()
        .body(new BaseResponseBody(200, "OK", sketches));
  }

  @GetMapping("/{sketchId}")
  public ResponseEntity<? extends BaseResponseBody> getSketch(
      @PathVariable("sketchId") Integer sketchId) {

    var sketch = sketchService.findSketchById(sketchId);

    return ResponseEntity
        .ok()
        .body(new BaseResponseBody(200, "OK", sketch));
  }


  @PostMapping
  public ResponseEntity<? extends BaseResponseBody> createSketch(
      @RequestPart
      SketchPostRequest sketch,
      @RequestPart
      MultipartFile sketchImg,
      HttpServletRequest request) throws IOException {

    var userId = (String) request.getAttribute("userId");
    var id = sketchService.saveSketch(userId, sketch, sketchImg);

    var location = URI.create(request.getRequestURI() + "/" + id);
    var successMessage = "스케치북 생성 성공: (ID=" + id + ")";

    return ResponseEntity
        .created(location)
        .body(new BaseResponseBody<>(201, "Created", successMessage));
  }

  @DeleteMapping("/{sketchId}")
  public ResponseEntity<? extends BaseResponseBody> deleteSketch(
      @PathVariable
      @Positive(message = "필수 입력값 입니다(양수).")
      Integer sketchId) {

    sketchService.deleteSketch(sketchId);

    var successMessage = "스케치북이 성공적으로 삭제되었습니다: (ID=" + sketchId + ")";

    return ResponseEntity
        .ok()
        .body(new BaseResponseBody<>(200, "OK", successMessage));
  }
}
