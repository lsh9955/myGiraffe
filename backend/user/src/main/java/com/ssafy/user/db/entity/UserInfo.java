package com.ssafy.user.db.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;


//@Data
// Getter, Setter, RequiredArgsConstructor, toString
@Getter
@Builder(toBuilder = true)
@NoArgsConstructor(access = AccessLevel.PROTECTED) // Parameter 없는 기본 생성자 생성 |
@AllArgsConstructor
@Table(name = "user_info")
@Entity
// 속성 access : 기본 생성자, 정의한 생성자 를 제외한 임의의 객체생성 형태 불가
public class UserInfo extends BaseTimeEntity {

  @Id
  @Column(name = "user_id")
  private String userId;

  @Column(name = "user_name", nullable = false)
  private String userName;

  @Column(name = "profile_img", nullable = false)
  private String profileImg;

  @Column(name = "coin_amount", nullable = false)
  @ColumnDefault("0")
  private int coinAMount;

  @OneToMany(mappedBy = "userInfo", cascade = CascadeType.ALL)
  @JsonManagedReference
  private List<MyBook> myBooks;

  @OneToMany(mappedBy = "userInfo", cascade = CascadeType.ALL)
  @JsonManagedReference
  private List<Diary> diaries;

  @OneToMany(mappedBy = "userInfo", cascade = CascadeType.ALL)
  @JsonManagedReference
  private List<Sketch> sketches;
}
