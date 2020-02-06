package com.moyo.MOYO.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.moyo.MOYO.dto.DailyAccompany;
import com.moyo.MOYO.repository.DailyAccompanyRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class DailyAccompanyServiceImpl implements DailyAccompanyService {
	
	@Autowired
	DailyAccompanyRepository dAccompanyRepo;
	
	@Override
	public List<DailyAccompany> selectAll() {
		log.trace("DailyAccompanyService - selectAll");
		return dAccompanyRepo.selectAll();
	}
	
	@Override
	public List<DailyAccompany> selectAllByUser(int uId) {
		log.trace("DailyAccompanyService - selectAllByUser");
		return dAccompanyRepo.selectAllByUser(uId);
	}
	
	@Override
	public DailyAccompany selectOne(int dAcId) {
		log.trace("DailyAccompanyService - selectOne");
		return dAccompanyRepo.selectOne(dAcId);
	}
	
	@Override
	@Transactional
	public int create(DailyAccompany dailyAccompany) {
		log.trace("DailyAccompanyService - create");
		return dAccompanyRepo.create(dailyAccompany);
	}
	
	@Override
	@Transactional
	public int delete(int dAcId, int uId) {
		log.trace("DailyAccompanyService - delete");
		Map<String, Integer> param = new HashMap<String, Integer>();
    	param.put("dAcId", dAcId);
    	param.put("uId", uId);
		return dAccompanyRepo.delete(param);
	}
	
	@Override
	@Transactional
	public int update(DailyAccompany dailyAccompany) {
		log.trace("DailyAccompanyService - update");
		return dAccompanyRepo.update(dailyAccompany);
	}

}
