package com.example.books.db.entity;

import com.example.books.api.dto.request.ScenarioPutRequest;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@Builder(toBuilder = true)
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "scenario")
@Entity
public class Scenario {

  @Id
  @Column(name = "scenario_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer scenarioId;

  @Column(name = "title", nullable = false)
  private String title;

  @Column(name = "price", nullable = false)
  private Integer price;

  @Column(name = "intro_script")
  private String introScript;

  @Column(name = "intro_img_url")
  private String introImgUrl;

  @Column(name = "thumbnail_img_url")
  private String thumbnailImgUrl;

  @Column(name = "inter_contents")
  private String interContents;

  public void update(ScenarioPutRequest request) {
  }
}
