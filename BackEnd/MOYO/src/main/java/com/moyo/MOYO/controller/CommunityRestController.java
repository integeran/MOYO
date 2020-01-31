package com.moyo.MOYO.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.moyo.MOYO.service.CommunityService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class CommunityRestController {
	
	@Autowired
	CommunityService cService;
	
	@GetMapping("/community/selectAll")
	public ResponseEntity<Map<String, Object>> selectAll() {
		try {
			log.trace("CommunityRestController - selectAll");
			return response(cService.selectAll(), HttpStatus.OK, true);
		} catch(RuntimeException e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	private ResponseEntity<Map<String, Object>> response(Object data, HttpStatus httpstatus, boolean status) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("data", data);
		resultMap.put("status", status);
		return new ResponseEntity<Map<String,Object>>(resultMap, httpstatus);
	}
}
