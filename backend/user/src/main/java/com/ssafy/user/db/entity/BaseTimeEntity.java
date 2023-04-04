package com.ssafy.user.db.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import java.time.LocalDateTime;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@EntityListeners(value = AuditingEntityListener.class) // Auditing 기능 포함
@MappedSuperclass                              // JPA Entity 클래스들이 이 클래스를 상속할 경우 필드들도 칼럼으로 인식하게 함.
public class BaseTimeEntity {

  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  @CreatedDate
  @Column(updatable = false)
  private LocalDateTime createdAt; // 생성 시간

  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  @LastModifiedDate
  private LocalDateTime modifiedAt; // 수정 시간


}
