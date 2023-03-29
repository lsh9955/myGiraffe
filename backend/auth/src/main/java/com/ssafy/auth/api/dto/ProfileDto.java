package com.ssafy.auth.api.dto;

import lombok.*;

@Data
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProfileDto {
	private String profileId;
	private String nickname;
	private String image;

	public ProfileDto(String profileId, String image) {
		this.profileId = profileId;
		this.image = image;
	}

	public void updateProfileId(String profileId) {
		this.profileId = profileId;
	}
	public void updateImage(String image) {this.image = image;}
}
