package com.ssafy.auth.api.dto;

import com.ssafy.auth.api.entity.User;
import lombok.*;
@Data
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {
    private String userId;
    private String socialId;

    public User toUser(UserDto userDto) {
        return User.builder().socialId(userDto.getSocialId()).build();
    }
}
