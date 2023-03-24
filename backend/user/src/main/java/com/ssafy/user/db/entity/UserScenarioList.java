package com.ssafy.user.db.entity;

import jakarta.persistence.*;

public class UserScenarioList extends BaseTimeEntity {

    @Id
    @Column(name = "scenario_list_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer scenarioListId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserInfo userInfo;

    @Column(name = "scenario_id", nullable = false)
    private Integer scenarioId;

}
