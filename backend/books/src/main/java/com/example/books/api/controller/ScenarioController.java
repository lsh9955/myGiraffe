package com.example.books.api.controller;

import com.example.books.api.dto.request.ScenarioPostRequest;
import com.example.books.api.dto.request.ScenarioPutRequest;
import com.example.books.api.dto.response.BaseResponseBody;
import com.example.books.api.service.ScenarioService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin
@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("api/books/scenarios")
public class ScenarioController {

  private final ScenarioService scenarioService;

  @GetMapping
  public ResponseEntity<? extends BaseResponseBody> getAllScenarios() {

    var scenarios = scenarioService.findAllScenarios();

    return ResponseEntity
        .ok()
        .body(new BaseResponseBody<>(200, "OK", scenarios));
  }

  @GetMapping("/{scenarioId}")
  public ResponseEntity<? extends BaseResponseBody> getScenario(
      @PathVariable("scenarioId")
      @Positive(message = "필수 입력값입니다(양수).")
      Integer scenarioId) {

    var scenario = scenarioService.findScenarioById(scenarioId);

    return ResponseEntity
        .ok()
        .body(new BaseResponseBody<>(200, "OK", scenario));
  }

//  @PostMapping/*(consumes = {"multipart/form-data"})*/
//  public ResponseEntity<? extends BaseResponseBody> createScenario(
//      @Valid
//      @ModelAttribute
//      ScenarioPostRequest scenario,
//      HttpServletRequest request) throws IOException {
//
//    var id = scenarioService.saveScenario(scenario);
//
//    var location = URI.create(request.getRequestURI() + "/" + id);
//    var successMessage = "시나리오 생성 성공: (ID=" + id + ")";
//
//    return ResponseEntity
//        .created(location)
//        .body(new BaseResponseBody<>(201,"Created", successMessage));
//  }
  @PostMapping(consumes = {"multipart/form-data"})
  public ResponseEntity<? extends BaseResponseBody> createScenario(
      @RequestPart @Valid ScenarioPostRequest scenarioInfo,
      @RequestPart(required = false) MultipartFile introImg,
      @RequestPart(required = false) MultipartFile thumbnailImg,
      HttpServletRequest request) throws IOException {

    Integer id = scenarioService.saveScenario(scenarioInfo, introImg, thumbnailImg);

    var location = URI.create(request.getRequestURI() + "/" + id);
    var successMessage = "시나리오 생성 성공: (ID=" + id + ")";

    return ResponseEntity
        .created(location)
        .body(new BaseResponseBody<>(201,"Created", successMessage));
  }

  @PutMapping
  public ResponseEntity<? extends BaseResponseBody> updateScenario(
      @RequestPart @Valid ScenarioPutRequest scenarioInfo,
      @RequestPart(required = false) MultipartFile introImg,
      @RequestPart(required = false) MultipartFile thumbnailImg
  ) throws IOException {

    var id = scenarioService.updateScenario(scenarioInfo, introImg, thumbnailImg);
    var updateMessage = "시나리오 수정 성공: (ID=" + id + ")";

    return ResponseEntity
        .ok()
        .body(new BaseResponseBody<>(200, "OK", updateMessage));
  }

  @DeleteMapping("/{scenarioId}")
  public ResponseEntity<? extends BaseResponseBody> deleteScenario(
      @PathVariable
      @Positive(message = "필수 입력값입니다(양수).")
      Integer scenarioId) {

    scenarioService.deleteScenario(scenarioId);

    var successMessage = "시나리오가 성공적으로 삭제되었습니다: (ID=" + scenarioId + ")";

    return ResponseEntity
        .ok()
        .body(new BaseResponseBody<>(200, "OK", successMessage));
  }

}
