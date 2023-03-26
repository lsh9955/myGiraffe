package com.ssafy.user.db.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MyBookPage {

    @Id
    @Column(name = "page_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer pageId;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private MyBook bookId;

    @Column(name = "page_no", nullable = false)
    private String pageNo;

    @Column(name = "script", columnDefinition = "TEXT")
    private String script;

    @Column(name = "bg_img_url")
    private String bgImgUrl;

    @Column(name = "next_page")
    private String nextPage;

    @Column(name = "obj_data")
    private String objData;

    @Column(name = "obj_user_data")
    private String objUserData;
}
