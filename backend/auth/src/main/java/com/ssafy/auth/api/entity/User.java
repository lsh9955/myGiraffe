package com.ssafy.auth.api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.JdbcType;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.Type;
import org.hibernate.type.SqlTypes;

import java.util.UUID;

@DynamicInsert
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Builder
public class User {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "user_id")
    // @Type(type = "uuid-char")
    @JdbcTypeCode(SqlTypes.CHAR)
    private UUID userId;

    private String socialId;
 /*
    private String status;

    public void updateStatus(String status) {
        this.status = status;
    }
 */
}
