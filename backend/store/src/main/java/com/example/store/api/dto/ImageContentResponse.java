package com.example.store.api.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.core.io.Resource;

@Builder
@Data
public class ImageContentResponse {
  private String contentType;
  private Resource resource;
}
