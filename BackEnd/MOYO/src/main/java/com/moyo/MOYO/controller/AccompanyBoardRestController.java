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

import com.moyo.MOYO.dto.AccompanyBoard;
import com.moyo.MOYO.dto.Filter;
import com.moyo.MOYO.dto.User;
import com.moyo.MOYO.service.AccompanyBoardService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class AccompanyBoardRestController {
	
	@Autowired
	AccompanyBoardService acService;
	
	@GetMapping("accompanyBoard/selectAll")
	@ResponseBody
	public ResponseEntity<Map<String, Object>> selectAll(@RequestBody Filter filter) {
		try {
			log.trace("AccompanyBoardRestController - selectAll : ",filter);
			return response(acService.selectAll(filter), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			log.error("AccompanyBoardRestController - selectAll : ",filter);
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@GetMapping("accompanyBoard/selectOne/{acBoardId}")
	public ResponseEntity<Map<String, Object>> selectOne(@PathVariable int acBoardId) {
		try {
			log.trace("AccompanyBoardRestController - selectOne : ",acBoardId);
			return response(acService.selectOne(acBoardId), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			log.error("AccompanyBoardRestController - selectOne : ",acBoardId);
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@PostMapping("accompanyBoard/create")
	public ResponseEntity<Map<String, Object>> create(@RequestBody AccompanyBoard accompanyBoard) {
		try {
			log.trace("AccompanyBoardRestController - create : ",accompanyBoard);
			return response(acService.create(accompanyBoard), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			log.error("AccompanyBoardRestController - create : ",accompanyBoard);
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@DeleteMapping("accompanyBoard/delete/{acBoardId}")
	public ResponseEntity<Map<String, Object>> delete(@PathVariable int acBoardId) {
		try {
			log.trace("AccompanyBoardRestController - delete : ", acBoardId);
			return response(acService.delete(acBoardId), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			log.error("AccompanyBoardRestController - delete : ", acBoardId);
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@PutMapping("accompanyBoard/update")
	public ResponseEntity<Map<String, Object>> update(@RequestBody AccompanyBoard accompanyBoard) {
		try {
			log.trace("AccompanyBoardRestController - update : ", accompanyBoard);
			return response(acService.update(accompanyBoard), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			log.error("AccompanyBoardRestController - update : ", accompanyBoard);
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
