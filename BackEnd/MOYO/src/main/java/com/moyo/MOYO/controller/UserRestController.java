package com.moyo.MOYO.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.moyo.MOYO.dto.User;
import com.moyo.MOYO.service.JwtService;
import com.moyo.MOYO.service.UserService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class UserRestController {
	
	@Autowired
	UserService uService;
	
	@Autowired
	JwtService jwtService;
	
	@GetMapping("user/selectAll")
	public ResponseEntity<Map<String, Object>> selectAll() {
		try {
			log.trace("UserRestController - selectAll");
			return response(uService.selectAll(), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@PostMapping("user/register")
	public ResponseEntity<Map<String, Object>> register(@RequestBody User user) {
		try {
			log.trace("UserRestController - register");
			return response(uService.register(user), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@DeleteMapping("user/delete")
	public ResponseEntity<Map<String, Object>> delete(@RequestParam("uId") int uId) {
		System.out.println(uId);
		try {
			log.trace("UserRestController - delete");
			return response(uService.delete(uId), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@PutMapping("user/update")
	public ResponseEntity<Map<String, Object>> update(@RequestBody User user) {
		try {
			log.trace("UserRestController - update");
			return response(uService.update(user), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@GetMapping("uset/selectOne/{uId}")
	public ResponseEntity<Map<String, Object>> selectOne(@PathVariable int uId) {
		try {
			log.trace("UserRestController - selectOne");
			return response(uService.selectOne(uId), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@GetMapping("user/selectOneBySocialId")
	public ResponseEntity<Map<String, Object>> selectOneBySocialId(@RequestParam("socialId") String socialId, @RequestParam("provider") int provider) {
		try {
			log.trace("UserRestController - selectOneBySocialId");
			return response(uService.selectOneBySocialId(socialId, provider), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@PostMapping("user/issueToken")
	public ResponseEntity<Map<String, Object>> issueToken(@RequestBody User user) {
		String token = null;
		try {
			User loginUser = uService.selectOneBySocialId(user.getSocialId(), user.getProvider());
			if (loginUser != null) {
				token = jwtService.createLoginToken(loginUser);
			}
			return response(token, HttpStatus.OK, true);
		} catch (RuntimeException e) {
			return response(token, HttpStatus.CONFLICT, false);
		}
		
	}
	
	public ResponseEntity<Map<String, Object>> response(Object data, HttpStatus httpstatus, boolean status) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("data", data);
		resultMap.put("status", status);
		
		return new ResponseEntity<Map<String,Object>>(resultMap, httpstatus);
	}

}
