package com.ssafy.user.db.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Builder(toBuilder = true)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "sketch")
@Entity
public class Sketch extends BaseTimeEntity {

    @Id
    @Column(name = "sketch_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer sketchId;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private UserInfo userInfo;

    @Column(name = "sketch_img_url", nullable = false)
    private String sketchImgUrl;

    @Column(name = "sketch_name", nullable = false)
    private String sketchName;
}
