package com.ssafy.user.db.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder(toBuilder = true)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "sketch")
@Entity
public class Sketch extends BaseTimeEntity {

  @Id
  @Column(name = "sketch_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer sketchId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  @JsonBackReference
  private UserInfo userInfo;

  @Column(name = "sketch_img_url", nullable = false)
  private String sketchImgUrl;

  @Column(name = "sketch_name", nullable = false)
  private String sketchName;
}
