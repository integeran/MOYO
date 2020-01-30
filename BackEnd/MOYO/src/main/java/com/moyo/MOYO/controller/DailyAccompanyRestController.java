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
import org.springframework.web.bind.annotation.RestController;

import com.moyo.MOYO.dto.DailyAccompany;
import com.moyo.MOYO.service.DailyAccompanyService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class DailyAccompanyRestController {
	
	@Autowired
	DailyAccompanyService dAccompanyService;
	
	@GetMapping("dailyAccompany/selectAll")
	public ResponseEntity<Map<String, Object>> selectAll() {
		try {
			log.trace("DailyAccompanyRestController - selectAll");
			return response(dAccompanyService.selectAll(), HttpStatus.OK, true);
		} catch (Exception e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@GetMapping("dailyAccompany/selectAllByUser/{uId}")
	public ResponseEntity<Map<String, Object>> selectAllByUser(@PathVariable int uId) {
		try {
			log.trace("DailyAccompanyRestController - selectAllByUser");
			return response(dAccompanyService.selectAllByUser(uId), HttpStatus.OK, true);
		} catch (Exception e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@GetMapping("dailyAccompany/selectOne/{dAcId}")
	public ResponseEntity<Map<String, Object>> selectOne(@PathVariable int dAcId) {
		try {
			log.trace("DailyAccompanyRestController - selectOne");
			return response(dAccompanyService.selectOne(dAcId), HttpStatus.OK, true);
		} catch (Exception e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@PostMapping("dailyAccompany/create")
	public ResponseEntity<Map<String, Object>> create(@RequestBody DailyAccompany dailyAccompany) {
		try {
			log.trace("DailyAccompanyRestController - create");
			return response(dAccompanyService.create(dailyAccompany), HttpStatus.OK, true);
		} catch (Exception e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@DeleteMapping("dailyAccompany/delete/{dAcId}")
	public ResponseEntity<Map<String, Object>> delete(@PathVariable int dAcId) {
		try {
			log.trace("DailyAccompanyRestController - delete");
			return response(dAccompanyService.delete(dAcId), HttpStatus.OK, true);
		} catch (Exception e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@PutMapping("dailyAccompany/update")
	public ResponseEntity<Map<String, Object>> update(@RequestBody DailyAccompany dailyAccompany) {
		try {
			log.trace("DailyAccompanyRestController - update");
			return response(dAccompanyService.update(dailyAccompany), HttpStatus.OK, true);
		} catch (Exception e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	public ResponseEntity<Map<String, Object>> response(Object data, HttpStatus httpstatus, boolean status) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("data", data);
		resultMap.put("status", status);
		
		return new ResponseEntity<Map<String,Object>>(resultMap, httpstatus);
	}

}
