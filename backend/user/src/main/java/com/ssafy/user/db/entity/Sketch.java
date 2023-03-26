package com.ssafy.user.db.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Sketch extends BaseTimeEntity {

    @Id
    @Column(name = "sketch_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer sketchId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserInfo userId;

    @Column(name = "sketch_img_url", nullable = false)
    private String sketchImgUrl;

    @Column(name = "sketch_name", nullable = false)
    private String sketchName;
}
