package com.ssafy.user.db.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Data
@Entity
public class UserInfo {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
//  @Column(nullable = false, unique = true)
  private Integer userId;

  @Column(nullable = false)
  private String userName;

  @Column(nullable = true)
  private String profileImageUrl;

}