package com.ssafy.user.db.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Builder(toBuilder = true)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "my_book_page")
@Entity
public class MyBookPage {

    @Id
    @Column(name = "page_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer pageId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "my_book")
    @JsonBackReference // 1. 연관관계의 주인 Entity 에 선언   2. 직렬화가 되지 않도록 수행
    private MyBook myBook;

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

    @Column(name = "obj_user_data", columnDefinition = "MEDIUMTEXT")
    private String objUserData;

    @Column(name = "inter_user_img_url")
    private String interUserImgUrl;
}
