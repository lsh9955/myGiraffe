package com.example.books.db.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "page", indexes = @Index(name="idx_page", columnList = "scenario_id, page_no"))
@Entity
public class Page {

  @Id
  @Column(name = "page_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer pageId;

  @ManyToOne(cascade = CascadeType.REMOVE)
  @JoinColumn(name = "scenario_id")
  private Scenario scenarioId;

  @Column(name = "page_no", nullable = false)
  private String pageNo;

  @Column(name = "script", columnDefinition = "TEXT")
  private String script;

  @Column(name = "bg_img_url")
  private String bgImgUrl;

  @Column(name = "next_page")
  private String nextPage;

  @Column(name = "obj_data", columnDefinition = "MEDIUMTEXT")
  private String objData;

}
