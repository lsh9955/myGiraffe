package com.ssafy.auth.api;

import lombok.Getter;

@Getter
public enum JwtCode {
	DENIED,
	ACCESS,
	EXPIRED;
}
