package com.moyo.MOYO.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moyo.MOYO.dto.AccompanyBoard;
import com.moyo.MOYO.repository.AccompanyBoardRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AccompanyBoardServiceImpl implements AccompanyBoardService {
	
	@Autowired
	AccompanyBoardRepository acRepo;
	
	@Override
	public List<AccompanyBoard> selectAll() {
		log.trace("AccompanyBoardService - selectAll");
		return acRepo.selectAll();
	}
	
	@Override
	public int create(AccompanyBoard accompanyBoard) {
		log.trace("AccompanyBoardService - create");
		return acRepo.create(accompanyBoard);
	}
	
	@Override
	public int delete(int acBoardId) {
		log.trace("AccompanyBoardService - delete");
		return acRepo.delete(acBoardId);
	}
	
	@Override
	public int update(AccompanyBoard accompanyBoard) {
		log.trace("AccompanyBoardService - update");
		return acRepo.update(accompanyBoard);
	}
	

}
