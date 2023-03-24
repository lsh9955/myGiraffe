package com.ssafy.user.db.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MyBook extends BaseTimeEntity {

    @Id
    @Column(name = "book_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer bookId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserInfo userinfo;

    @Column(name = "book_name", nullable = false)
    private String bookName;

    @Column(name = "scenario_id", nullable = false)
    private Long scenarioId;

}
