package com.ssafy.user.db.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Builder(toBuilder = true)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "user_scenario_list")
@Entity
public class UserScenarioList {

    @Id
    @Column(name = "user_scenarios_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userScenariosId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private UserInfo userInfo;

    @Column(name = "scenario_id", nullable = false)
    private Integer scenarioId;

}
