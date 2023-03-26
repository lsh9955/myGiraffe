package com.ssafy.user.db.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserScenarioList extends BaseTimeEntity {

    @Id
    @Column(name = "user_scenarios_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userScenariosId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserInfo userId;

    @Column(name = "scenario_id", nullable = false)
    private Integer scenarioId;

}
