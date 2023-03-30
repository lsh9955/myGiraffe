package com.ssafy.user.db.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Builder(toBuilder = true)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "my_book")
@Entity
public class MyBook extends BaseTimeEntity {

    @Id
    @Column(name = "book_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer bookId;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "user_id")
    private UserInfo userInfo;

    @Column(name = "book_name", nullable = false)
    private String bookName;

    @Column(name = "scenario_id", nullable = false)
    private Integer scenarioId;

}
