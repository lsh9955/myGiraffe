package com.ssafy.user.db.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MyBookPage {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pageId;

    @ManyToOne
    @JoinColumn(name = "my_book")
    private MyBook myBook;

    @Column(nullable = false)
    private String pageNo;

    @Column(columnDefinition = "TEXT")
    private String script;

    private String bgImgUrl;

    private String nextPage;

    private String objData;

    private String objUserData;
}
