package com.ssafy.auth.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController("/api/auth")
public class AuthController {

	@GetMapping("/{token}")
	boolean checkAccessToken(@PathVariable String token) {
		System.out.println(token);
		return true;
	}

}
