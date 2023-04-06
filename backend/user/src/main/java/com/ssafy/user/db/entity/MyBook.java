package com.ssafy.user.db.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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

@Getter
@Builder(toBuilder = true)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "my_book")
@Entity
public class MyBook extends BaseTimeEntity {

  @Id
  @Column(name = "book_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer bookId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  @JsonBackReference
  private UserInfo userInfo;

  @Column(name = "book_name", nullable = false)
  private String bookName;

  @Column(name = "scenario_id", nullable = false)
  private Integer scenarioId;


  @OneToMany(mappedBy = "myBook", cascade = CascadeType.ALL) // 부모에서 하위 엔티티 변경 적용
  @JsonManagedReference // 1. 연관관계 주인 반대 Entity 에 선언   2. 정상적으로 직렬화 수행
  private List<MyBookPage> myBookPageList;

  @Column(name = "is_saved", nullable = false)
  @ColumnDefault("false")
  private Boolean isSaved;

}
