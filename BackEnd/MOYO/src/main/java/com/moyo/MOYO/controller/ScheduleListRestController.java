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

import com.moyo.MOYO.dto.ScheduleList;
import com.moyo.MOYO.service.ScheduleListService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class ScheduleListRestController {
	
	@Autowired
	ScheduleListService sListService;
	
	@GetMapping("scheduleList/selectAll")
	public ResponseEntity<Map<String, Object>> selectAll() {
		try {
			log.trace("ScheduleListRestController - selectAll");
			return response(sListService.selectAll(), HttpStatus.OK, true);
		} catch (Exception e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@GetMapping("scheduleList/selectAllByUser/{uId}")
	public ResponseEntity<Map<String, Object>> selectAllByUser(int uId) {
		try {
			log.trace("ScheduleListRestController - selectAllByUser");
			return response(sListService.selectAllByUser(uId), HttpStatus.OK, true);
		} catch (Exception e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@GetMapping("scheduleList/selectOne/{sListId}")
	public ResponseEntity<Map<String, Object>> selectOne(@PathVariable int sListId) {
		try {
			log.trace("ScheduleListRestController - selectOne");
			return response(sListService.selectOne(sListId), HttpStatus.OK, true);
		} catch (Exception e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@PostMapping("scheduleList/create")
	public ResponseEntity<Map<String, Object>> create(@RequestBody ScheduleList scheduleList) {
		try {
			log.trace("ScheduleListRestController - create");
			return response(sListService.create(scheduleList), HttpStatus.OK, true);
		} catch (Exception e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@DeleteMapping("scheduleList/delete/{sListId}")
	public ResponseEntity<Map<String, Object>> delete(@PathVariable int sListId) {
		try {
			log.trace("ScheduleListRestController - delete");
			return response(sListService.delete(sListId), HttpStatus.OK, true);
		} catch (Exception e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@PutMapping("scheduleList/update")
	public ResponseEntity<Map<String, Object>> update(@RequestBody ScheduleList scheduleList) {
		try {
			log.trace("ScheduleListRestController - update");
			return response(sListService.update(scheduleList), HttpStatus.OK, true);
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
