package com.moyo.MOYO.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.moyo.MOYO.dto.Community;
import com.moyo.MOYO.service.CommunityService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@CrossOrigin("*")
public class CommunityRestController {
	
	@Autowired
	CommunityService cService;
	
	@GetMapping("/DM/testID")
	public ResponseEntity<Map<String, Object>> testID() {
		try {
			Map<String, Object> resultMap = new HashMap<String, Object>();

			resultMap.put("receiver", tempObject(5, "INDONG", 28, "m", null, 1, 2, "kunder@kakao.com", 0, 1, "2020-01-20 06:28:47", "2020-01-20 06:28:47"));
			resultMap.put("sender", tempObject(6, "SUNGCHAN", 25, "m", null, 2, 5, "tjdcksdl00@kakao.com", 0, 2, "2020-01-22 16:28:47", "2020-01-23 19:21:43"));
			return response(resultMap, HttpStatus.OK, true);
		} catch(RuntimeException e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	private Map<String, Object> tempObject(int uId, String nickname, int age, String gender, String image, int beforePsId, 
			int afterPsId, String socialId, int provider, int level, String registerDate, String updateDate) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("uId", uId);
		resultMap.put("nickname", nickname);
		resultMap.put("age", age);
		resultMap.put("gender", gender);
		resultMap.put("image", image);
		resultMap.put("beforePsId", beforePsId);
		resultMap.put("afterPsId", afterPsId);
		resultMap.put("socialId", socialId);
		resultMap.put("provider", provider);
		resultMap.put("level", level);
		resultMap.put("registerDate", registerDate);
		resultMap.put("updateDate", updateDate);
		
		return resultMap;
	}
	
	@GetMapping("/community/selectAll")
	public ResponseEntity<Map<String, Object>> selectAll() {
		try {
			log.trace("CommunityRestController - selectAll");
			return response(cService.selectAll(), HttpStatus.OK, true);
		} catch(RuntimeException e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@GetMapping("/community/selectAllByUser/{uId}")
	public ResponseEntity<Map<String, Object>> selectAllByUser(@PathVariable int uId) {
		try {
			log.trace("CommunityRestController - selectAllByUser");
			return response(cService.selectAllByUser(uId), HttpStatus.OK, true);
		} catch(RuntimeException e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@GetMapping("/community/selectOne/{cmId}")
	public ResponseEntity<Map<String, Object>> selectOne(@PathVariable int cmId) {
		try {
			log.trace("CommunityRestController - selectOne");
			return response(cService.selectOne(cmId), HttpStatus.OK, true);
		} catch(RuntimeException e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@PostMapping("/community/create")
	public ResponseEntity<Map<String, Object>> create(@RequestBody Community community) {
		try {
			log.trace("CommunityRestController - create");
			return response(cService.create(community), HttpStatus.OK, true);
		} catch(RuntimeException e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@DeleteMapping("/community/delete/{cmId}")
	public ResponseEntity<Map<String, Object>> delete(@PathVariable int cmId) {
		try {
			log.trace("CommunityRestController - delete");
			return response(cService.delete(cmId), HttpStatus.OK, true);
		} catch(RuntimeException e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@PutMapping("/community/update")
	public ResponseEntity<Map<String, Object>> update(@RequestBody Community community) {
		try {
			log.trace("CommunityRestController - update");
			return response(cService.update(community), HttpStatus.OK, true);
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
