package com.ssafy.auth.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/api/auth")
public class AuthController {

	@GetMapping
	boolean checkAccessToken() {
		return true;
	}

}
