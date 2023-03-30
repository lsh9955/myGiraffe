package com.ssafy.user.db.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "diary")
@Entity
public class Diary extends BaseTimeEntity {

    @Id
    @Column(name = "diary_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer diaryId;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "user_id")
    private UserInfo userInfo;

    @Column(name = "diary_img_url", nullable = false)
    private String diaryImgUrl;

    @Column(name = "diary_name", nullable = false)
    private String diaryName;

}
