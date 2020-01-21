package com.moyo.MOYO.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.moyo.MOYO.dto.User;
import com.moyo.MOYO.service.UserService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class UserRestController {
	
	@Autowired
	UserService uService;
	
	@GetMapping("user/selectAll")
	public ResponseEntity<Map<String, Object>> selectAll() {
		try {
			log.trace("UserRestController - selectAll");
			return response(uService.selectAll(), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			return response(uService.selectAll(), HttpStatus.CONFLICT, false);
		}
	}
	
	@PostMapping("user/register")
	public ResponseEntity<Map<String, Object>> register(@RequestBody User user) {
		try {
			log.trace("UserRestController - register");
			return response(uService.register(user), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			return response(uService.register(user), HttpStatus.CONFLICT, false);
		}
	}
	
	@DeleteMapping("user/delete/?uId={}")
	public ResponseEntity<Map<String, Object>> delete(@RequestParam int uId) {
		try {
			log.trace("UserRestController - delete");
			return response(uService.delete(uId), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			return response(uService.delete(uId), HttpStatus.CONFLICT, false);
		}
	}
	
	@PutMapping("user/update")
	public ResponseEntity<Map<String, Object>> update(@RequestBody User user) {
		try {
			log.trace("UserRestController - update");
			return response(uService.update(user), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			return response(uService.update(user), HttpStatus.CONFLICT, false);
		}
	}
	
	public ResponseEntity<Map<String, Object>> response(Object data, HttpStatus httpstatus, boolean status) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("data", data);
		resultMap.put("status", status);
		
		return new ResponseEntity<Map<String,Object>>(resultMap, httpstatus);
	}

}
