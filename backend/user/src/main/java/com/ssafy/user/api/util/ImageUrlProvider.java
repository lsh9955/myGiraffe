package com.ssafy.user.api.util;

import com.ssafy.user.api.dto.response.BaseResponseBody;
import com.ssafy.user.exception.BaseRuntimeException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RequiredArgsConstructor
@Component
public class ImageUrlProvider {
    @Value("${request.url}") String REQUEST_URL;
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

        if(image == null) return null;

        var jsonStr = sendMultiPartFileHttpRequest(image);

        var type = objectMapper.getTypeFactory().constructParametricType(BaseResponseBody.class, String.class);

        BaseResponseBody<String> responseBody = objectMapper.readValue(jsonStr, type);

        return responseBody.getContent();
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

        // Http 통신을 진행해 응답으로 돌아온 body String 을 반환
        try (var response = okHttpClient.newCall(request).execute()) {
            return Optional.ofNullable(response.body()) // response.body 는 한번 호출하면 다음부터는 null 을 반환함 (consume only once).
                    .map((body) -> {
                        try {
                            return body.string();
                        } catch (IOException e) {
                            return null;
                        }
                    })
                    .orElseThrow(() -> new BaseRuntimeException(HttpStatus.NOT_FOUND, "파일을 읽어오는데 실패했습니다."));
        } catch (IOException ex) {
            return null;
        }
    }
}
