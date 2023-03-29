package com.ssafy.user.api.controller;

import com.ssafy.user.api.dto.request.DiaryPostRequest;
import com.ssafy.user.api.dto.response.BaseResponseBody;
import com.ssafy.user.api.service.DiaryService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import jakarta.validation.executable.ValidateOnExecution;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URI;

@Slf4j
@Validated
@ValidateOnExecution
@RequiredArgsConstructor
@RestController
@RequestMapping("api/members")
public class DiaryController {

    private final DiaryService diaryService;

    @GetMapping("/diaries/{userId}")
    public ResponseEntity<? extends BaseResponseBody> getDiaries(
            @PathVariable("userId") String userId) {

        var diaries = diaryService.findDiariesByUserId(userId);

        return ResponseEntity
                .ok()
                .body(new BaseResponseBody<>(200, "OK", diaries));
    }

    @GetMapping("/diaries/{diaryId}")
    public ResponseEntity<? extends BaseResponseBody> getDiary(
            @PathVariable("diaryId") Integer diaryId) {

        var diary = diaryService.findDiaryById(diaryId);

        return ResponseEntity
                .ok()
                .body(new BaseResponseBody<>(200, "OK", diary));
    }

    @PostMapping
    public ResponseEntity<? extends BaseResponseBody> createDiary(
            @ModelAttribute
            @Valid
            DiaryPostRequest diary,
            HttpServletRequest request) throws IOException {

        var id = diaryService.saveDiary(diary);

        var location = URI.create(request.getRequestURI() + "/" + id);
        var successMessage = "그림일기 생성 성공: (ID=" + id + ")";

        return ResponseEntity
                .created(location)
                .body(new BaseResponseBody<>(201, "Created", successMessage));
    }

    @DeleteMapping("/diaries/{diaryId}")
    public ResponseEntity<? extends BaseResponseBody> deleteDiary(
            @PathVariable
            @Positive(message = "필수 입력값 입니다(양수).")
            Integer diaryId) {

        diaryService.deleteDiary(diaryId);

        var successMessage = "그림일기가 성공적으로 삭제되었습니다: (ID=" + diaryId + ")";

        return ResponseEntity
                .ok()
                .body(new BaseResponseBody<>(200, "OK", successMessage));
    }
}
