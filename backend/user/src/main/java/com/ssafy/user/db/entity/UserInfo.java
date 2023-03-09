package com.ssafy.user.db.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.ListIndexJdbcTypeCode;
import org.hibernate.type.SqlTypes;


@Table(name = "user_info")
@NoArgsConstructor
@Getter
@Entity
public class UserInfo {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(nullable = false, unique = true)
  private Integer userId;

  @Column(nullable = false)
  private String userName;

  @Column(nullable = true)
  private String profileImageUrl;

}