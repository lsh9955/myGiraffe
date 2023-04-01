package com.example.store.db.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Builder
@AllArgsConstructor
@Document(collection = "images")
public class ImageFile {

  @Id
  private String imageId;


  private String fileSystemPath;
}
