package com.example.books.api.controller;

import com.example.books.api.dto.request.ScenarioPostRequest;
import com.example.books.api.dto.response.BaseResponseBody;
import com.example.books.api.service.ScenarioService;
import com.example.books.db.entity.Scenario;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import jakarta.validation.executable.ValidateOnExecution;
import java.net.URI;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@ValidateOnExecution
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

  @PostMapping
  public ResponseEntity<? extends BaseResponseBody> createScenario(
      @RequestBody
      @Valid
      ScenarioPostRequest scenario) {

    var id = scenarioService.saveScenario(scenario);

    var location = URI.create("api/books/scenarios/" + id);
    var successMessage = "시나리오 생성 성공: (ID=" + id + ")";

    return ResponseEntity
        .created(location)
        .body(new BaseResponseBody<>(201,"Created", successMessage));
  }

//  @PutMapping("/{scenarioId}")
//  public ResponseEntity<? extends BaseResponseBody> updateScenario(
//      @PathVariable("scenario-id") Integer scenarioId,
//      @RequestBody  request) {
//    var id = scenarioService.updateScenario(scenarioId, request)
//
//    return ResponseEntity
//        .ok()
//        .body();
//  }
  // 수정할 내용만 받을지? 전체를 받을지?

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
