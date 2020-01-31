package com.moyo.MOYO.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@CrossOrigin("*")
public class DMTestRestController {
	
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
	
	private ResponseEntity<Map<String, Object>> response(Object data, HttpStatus httpstatus, boolean status) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("data", data);
		resultMap.put("status", status);
		return new ResponseEntity<Map<String,Object>>(resultMap, httpstatus);
	}
}
