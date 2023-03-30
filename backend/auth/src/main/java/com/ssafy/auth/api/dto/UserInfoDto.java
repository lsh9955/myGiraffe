package com.ssafy.auth.api.dto;

import lombok.*;

@Data
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserInfoDto {
	private String userId;
	private String nickname;
	private String image;

	public UserInfoDto(String userId, String image) {
		this.userId = userId;
		this.image = image;
	}

	public void updateProfileId(String profileId) {
		this.userId = profileId;
	}
	public void updateImage(String image) {this.image = image;}
}
