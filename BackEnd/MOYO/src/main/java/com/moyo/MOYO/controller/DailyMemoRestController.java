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

import com.moyo.MOYO.dto.DailyMemo;
import com.moyo.MOYO.service.DailyMemoService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class DailyMemoRestController {
	
	@Autowired
	DailyMemoService dMemoService;
	
	@GetMapping("dailyMemo/selectAll")
	public ResponseEntity<Map<String, Object>> selectAll() {
		try {
			log.trace("DailyMemoRestController - selectAll");
			return response(dMemoService.selectAll(), HttpStatus.OK, true);
		} catch (Exception e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@GetMapping("dailyMemo/selectAllByUser/{uId}")
	public ResponseEntity<Map<String, Object>> selectAllByUser(int uId) {
		try {
			log.trace("DailyMemoRestController - selectAllByUser");
			return response(dMemoService.selectAllByUser(uId), HttpStatus.OK, true);
		} catch (Exception e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@GetMapping("dailyMemo/selectOne/{dMemoId}")
	public ResponseEntity<Map<String, Object>> selectOne(@PathVariable int dMemoId) {
		try {
			log.trace("DailyMemoRestController - selectOne");
			return response(dMemoService.selectOne(dMemoId), HttpStatus.OK, true);
		} catch (Exception e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@PostMapping("dailyMemo/create")
	public ResponseEntity<Map<String, Object>> create(@RequestBody DailyMemo dailyMemo) {
		try {
			log.trace("DailyMemoRestController - create");
			return response(dMemoService.create(dailyMemo), HttpStatus.OK, true);
		} catch (Exception e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@DeleteMapping("dailyMemo/delete/{dMemoId}")
	public ResponseEntity<Map<String, Object>> delete(@PathVariable int dMemoId) {
		try {
			log.trace("DailyMemoRestController - delete");
			return response(dMemoService.delete(dMemoId), HttpStatus.OK, true);
		} catch (Exception e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@PutMapping("dailyMemo/update")
	public ResponseEntity<Map<String, Object>> update(@RequestBody DailyMemo dailyMemo) {
		try {
			log.trace("DailyMemoRestController - update");
			return response(dMemoService.update(dailyMemo), HttpStatus.OK, true);
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