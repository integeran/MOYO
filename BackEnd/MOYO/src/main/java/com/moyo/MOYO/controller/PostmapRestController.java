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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.moyo.MOYO.dto.Postmap;
import com.moyo.MOYO.dto.Postmaplike;
import com.moyo.MOYO.service.PostmapService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class PostmapRestController {
	
	@Autowired
	PostmapService pService;
	
	@GetMapping("postmap/selectAll")
	private ResponseEntity<Map<String, Object>> selectAll(@RequestParam double latitude, @RequestParam double longitude) {
		HashMap<String, Double> map = new HashMap<String, Double>();
		map.put("latitude", latitude);
		map.put("longitude", longitude);
		try {
			log.trace("PostmapRestController - selectAll : ", latitude,longitude);
			return response(pService.selectAll(map), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			log.error("PostmapRestController - selectAll : ", latitude,longitude);
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@GetMapping("postmap/selectOne/{pmId}")
	private ResponseEntity<Map<String, Object>> selectOne(@PathVariable int pmId) {
		try {
			log.trace("PostmapRestController - selectOne : ", pmId);
			return response(pService.selectOne(pmId), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			log.error("PostmapRestController - selectOne : ",pmId);
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@PostMapping("postmap/insertPostmap")
	private ResponseEntity<Map<String, Object>> insertPostmap(@RequestBody Postmap postmap) {
		try {
			log.trace("PostmapRestController - insertPostmap : ", postmap);
			return response(pService.insertPostmap(postmap), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			log.error("PostmapRestController - insertPostmap : ",postmap);
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@PutMapping("postmap/updatePostmap")
	private ResponseEntity<Map<String, Object>> updatePostmap(@RequestBody Postmap postmap) {
		try {
			log.trace("PostmapRestController - updatePostmap : ", postmap);
			return response(pService.updatePostmap(postmap), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			log.error("PostmapRestController - updatePostmap : ",postmap);
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@DeleteMapping("postmap/deletePostmap/{pmId}")
	private ResponseEntity<Map<String, Object>> deletePostmap(@PathVariable int pmId) {
		try {
			log.trace("PostmapRestController - deletePostmap : ", pmId);
			return response(pService.deletePostmap(pmId), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			log.error("PostmapRestController - deletePostmap : ",pmId);
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@GetMapping("postmap/checkDuration")
	private ResponseEntity<Map<String, Object>> checkDuration(@RequestParam String today) {
		try {
			log.trace("PostmapRestController - checkDuration : ", today);
			return response(pService.checkDuration(today), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			log.error("PostmapRestController - checkDuration : ", today);
			return response(e.getMessage(), HttpStatus.CONFLICT, true);
		}
	}
	
	@PutMapping("postmap/likePostmap")
	private ResponseEntity<Map<String, Object>> likePostmap(@RequestBody Postmaplike postmaplike) {
		try {
			log.trace("PostmapRestController - likePostmap : ", postmaplike);
			boolean isDuplicate = pService.checkLikeDuplicate(postmaplike.getUId());
			if(isDuplicate) {	//유저가 이미 좋아요 눌렀으면 delete
				return response(pService.deletePostmapLike(postmaplike.getPmId()), HttpStatus.OK, true);
			}else {	
				return response(pService.likePostmap(postmaplike), HttpStatus.OK, true);
			}
		} catch (RuntimeException e) {
			log.error("PostmapRestController - likePostmap : ",postmaplike);
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@DeleteMapping("postmap/deletePostmapLike/{pmLikeId}")
	private ResponseEntity<Map<String, Object>> deletePostmapLike(@PathVariable int pmLikeId) {
		try {
			log.trace("PostmapRestController - deletePostmapLike : ", pmLikeId);
			return response(pService.deletePostmapLike(pmLikeId), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			log.error("PostmapRestController - deletePostmapLike : ",pmLikeId);
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
