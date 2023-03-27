package com.example.books.api.util;

import com.example.books.api.dto.response.BaseResponseBody;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.Objects;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RequiredArgsConstructor
@Component
public class ImageUrlProvider {
  private final String REQUEST_URL = "http://127.0.0.1:9021/api/resources/images/upload";
  private final OkHttpClient okHttpClient = new OkHttpClient()
      .newBuilder()
      .connectTimeout(60, TimeUnit.SECONDS)
      .build();
  private final ObjectMapper objectMapper;


  /**
   * 이미지 파일을 store-service 에 http 요청으로 보내고, 응답으로 온 BaseResponseBody 에서
   * 이미지 url ("content")를 추출하여 반환하는 메소드입니다.
   * @param image 이미지 파일
   * @return 이미지 GET url
   * @throws IOException
   */
  public String getImageUrl(MultipartFile image) throws IOException {
    var responseJson = sendMultiPartFileHttpRequest(image);

    var javaType = objectMapper.getTypeFactory().constructParametricType(BaseResponseBody.class, String.class);

    BaseResponseBody<String> url = objectMapper.readValue(responseJson, javaType);

    return url.getContent();
  }

  private String sendMultiPartFileHttpRequest(MultipartFile imageFile) throws IOException {
    if(imageFile == null) return null;

    var fileBody = RequestBody.create(
        imageFile.getBytes(),
        okhttp3.MediaType.parse(Objects.requireNonNull(imageFile.getContentType()))
    );

    var multipartBody = new MultipartBody.Builder()
        .setType(MultipartBody.FORM)
        .addFormDataPart("imageFile", imageFile.getOriginalFilename(), fileBody)
        .build();

    var request = new Request.Builder()
        .url(REQUEST_URL)
        .post(multipartBody)
        .build();

    var responseBody = Objects.requireNonNull(
        okHttpClient.newCall(request).execute().body()).string();

    log.info(responseBody);
    return responseBody;
  }
}
