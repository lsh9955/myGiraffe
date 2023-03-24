package com.ssafy.user.db.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import java.util.ArrayList;
import java.util.List;


@Data // Getter, Setter, RequiredArgsConstructor, toString
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED) // Parameter 없는 기본 생성자 생성 |
// 속성 access : 기본 생성자, 정의한 생성자 를 제외한 임의의 객체생성 형태 불가
public class UserInfo extends BaseTimeEntity {

  @Id
  @Column(name = "user_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer userId;

  @Column(name = "user_name", nullable = false)
  private String userName;

  @Column(name = "profile_img", nullable = false)
  private String profileImg;

  @Column(name = "coin_amount", nullable = false)
  @ColumnDefault("0")
  private int coinAMount;

//  @OneToMany(mappedBy = "userinfo", cascade = CascadeType.ALL)
//  private List<MyBook> myBooks = new ArrayList<>();

}