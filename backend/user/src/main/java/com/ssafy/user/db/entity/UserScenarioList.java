package com.ssafy.user.db.entity;

import jakarta.persistence.*;

public class UserScenarioList extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer scenarioListId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserInfo userInfo;

    @Column(nullable = false)
    private Integer scenarioId;

}
