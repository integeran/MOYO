package com.moyo.MOYO.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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
import com.moyo.MOYO.dto.User;
import com.moyo.MOYO.service.AccompanyBoardService;
import com.moyo.MOYO.service.UserService;
import com.moyo.MOYO.service.UserServiceImpl;

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
			log.error("AccompanyBoardRestController - selectAll");
			return response(acService.selectAll(), HttpStatus.CONFLICT, false);
		}
	}
	
	@GetMapping("accompanyBoard/selectOne/{acBoardId}")
	public ResponseEntity<Map<String, Object>> selectOne(@PathVariable int acBoardId) {
		try {
			log.trace("AccompanyBoardRestController - selectOne : ",acBoardId);
			return response(acService.selectOne(acBoardId), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			log.error("AccompanyBoardRestController - selectOne : ",acBoardId);
			return response(acService.selectOne(acBoardId), HttpStatus.CONFLICT, false);
		}
	}
	
	@PostMapping("accompanyBoard/create")
	public ResponseEntity<Map<String, Object>> create(@RequestBody AccompanyBoard accompanyBoard) {
		try {
			log.trace("AccompanyBoardRestController - create : ",accompanyBoard);
			return response(acService.create(accompanyBoard), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			log.error("AccompanyBoardRestController - create : ",accompanyBoard);
			return response(acService.create(accompanyBoard), HttpStatus.CONFLICT, false);
		}
	}
	
	@DeleteMapping("accompanyBoard/delete/{acBoardId}")
	public ResponseEntity<Map<String, Object>> delete(@PathVariable int acBoardId) {
		try {
			log.trace("AccompanyBoardRestController - delete : ", acBoardId);
			return response(acService.delete(acBoardId), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			log.error("AccompanyBoardRestController - delete : ", acBoardId);
			return response(acService.delete(acBoardId), HttpStatus.CONFLICT, false);
		}
	}
	
	@PutMapping("accompanyBoard/update")
	public ResponseEntity<Map<String, Object>> update(@RequestBody AccompanyBoard accompanyBoard) {
		try {
			log.trace("AccompanyBoardRestController - update : ", accompanyBoard);
			return response(acService.update(accompanyBoard), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			log.error("AccompanyBoardRestController - update : ", accompanyBoard);
			return response(acService.update(accompanyBoard), HttpStatus.CONFLICT, false);
		}
	}
	
	@GetMapping("accompanyBoard/selectFilter")
	public ResponseEntity<Map<String, Object>> selectFilter(int[] wantAge, String wantGender, String tTypeId) {
		HashMap<String, Object> filter = new HashMap<String, Object>();
		try {
			filter.put("age", wantAge);
			filter.put("gender", wantGender);
			filter.put("ttypeid", tTypeId);
			log.trace("AccompanyBoardRestController - selectFilter : ",filter);
			return response(acService.selectFilter(filter), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			log.error("AccompanyBoardRestController - selectFilter : ",filter);
			return response(acService.selectFilter(filter), HttpStatus.CONFLICT, false);
		}
	}
	
	@GetMapping("accompanyBoard/search")
	public ResponseEntity<Map<String, Object>> search(String key, String word) {
		HashMap<String, Object> filter = new HashMap<String, Object>();
		try {
			filter.put("key", key);
			filter.put("word", word);
			log.trace("AccompanyBoardRestController - search : ",filter);
			return response(acService.search(filter), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			log.error("AccompanyBoardRestController - search : ",filter);
			return response(acService.search(filter), HttpStatus.CONFLICT, false);
		}
	}
	
	public ResponseEntity<Map<String, Object>> response(Object data, HttpStatus httpstatus, boolean status) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("data", data);
		resultMap.put("status", status);
		
		return new ResponseEntity<Map<String,Object>>(resultMap, httpstatus);
	}

}
