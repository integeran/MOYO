package com.moyo.MOYO.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.moyo.MOYO.service.JwtService;

@Component
public class JwtInterceptor implements HandlerInterceptor {
	private static final String HEADER_AUTH = "userToken";
	
	@Autowired
	private JwtService jwtService;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		final String token = request.getHeader(HEADER_AUTH);
		if (token != null && jwtService.isValidToken(token)) {
			return true;
		} else {
			throw new Exception();
		}
	}

}
