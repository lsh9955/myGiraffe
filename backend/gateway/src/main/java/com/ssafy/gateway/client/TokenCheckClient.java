package com.ssafy.gateway.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "token-check-client", url = "j8b201.p.ssafy.io:9001/api/auth")
public interface TokenCheckClient {
	@GetMapping
	boolean checkAccessToken();
}
