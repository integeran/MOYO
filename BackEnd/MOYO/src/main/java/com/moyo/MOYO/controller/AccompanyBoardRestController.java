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

import com.moyo.MOYO.dto.AccompanyBoard;
import com.moyo.MOYO.service.AccompanyBoardService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class AccompanyBoardRestController {
	
	@Autowired
	AccompanyBoardService acService;
	
	@GetMapping("accompanyBoard/selectAll")
	public ResponseEntity<Map<String, Object>> selectAll() {
		try {
			log.trace("AccompanyBoardRestController - selectAll");
			return response(acService.selectAll(), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			return response(acService.selectAll(), HttpStatus.CONFLICT, false);
		}
	}
	
	@PostMapping("accompanyBoard/create")
	public ResponseEntity<Map<String, Object>> create(@RequestBody AccompanyBoard accompanyBoard) {
		try {
			log.trace("AccompanyBoardRestController - create");
			return response(acService.create(accompanyBoard), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			return response(acService.create(accompanyBoard), HttpStatus.CONFLICT, false);
		}
	}
	
	@DeleteMapping("accompanyBoard/delete/?acBoardId={}")
	public ResponseEntity<Map<String, Object>> delete(@RequestParam int acBoardId) {
		try {
			return response(acService.delete(acBoardId), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			return response(acService.delete(acBoardId), HttpStatus.CONFLICT, false);
		}
	}
	
	@PutMapping("accompanyBoard/update")
	public ResponseEntity<Map<String, Object>> update(@RequestBody AccompanyBoard accompanyBoard) {
		try {
			return response(acService.update(accompanyBoard), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			return response(acService.update(accompanyBoard), HttpStatus.CONFLICT, false);
		}
	}
	
	public ResponseEntity<Map<String, Object>> response(Object data, HttpStatus httpstatus, boolean status) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("data", data);
		resultMap.put("status", status);
		
		return new ResponseEntity<Map<String,Object>>(resultMap, httpstatus);
	}

}
