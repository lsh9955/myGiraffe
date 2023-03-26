package com.ssafy.user.db.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Diary extends BaseTimeEntity {

    @Id
    @Column(name = "diary_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer diaryId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserInfo userId;

    @Column(name = "diary_img_url", nullable = false)
    private String diaryImgUrl;

    @Column(name = "diary_name", nullable = false)
    private String diaryName;

}
