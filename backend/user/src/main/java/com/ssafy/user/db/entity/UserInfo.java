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
