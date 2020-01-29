package com.moyo.MOYO.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moyo.MOYO.dto.DailyMemo;
import com.moyo.MOYO.repository.DailyMemoRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class DailyMemoServiceImpl implements DailyMemoService {
	
	@Autowired
	DailyMemoRepository dMemoRepo;
	
	@Override
	public List<DailyMemo> selectAll() {
		log.trace("DailyMemoService - selectAll");
		return dMemoRepo.selectAll();
	}
	
	@Override
	public List<DailyMemo> selectAllByUser(int uId) {
		log.trace("DailyMemoService - selectAllByUser");
		return dMemoRepo.selectAllByUser(uId);
	}
	
	@Override
	public DailyMemo selectOne(int dMemoId) {
		log.trace("DailyMemoService - selectOne");
		return dMemoRepo.selectOne(dMemoId);
	}
	
	@Override
	public int create(DailyMemo dailyMemo) {
		log.trace("DailyMemoService - create");
		return dMemoRepo.create(dailyMemo);
	}
	
	@Override
	public int delete(int dMemoId) {
		log.trace("DailyMemoService - delete");
		return dMemoRepo.delete(dMemoId);
	}
	
	@Override
	public int update(DailyMemo dailyMemo) {
		log.trace("DailyMemoService - update");
		return dMemoRepo.update(dailyMemo);
	}

}
