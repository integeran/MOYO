package com.moyo.MOYO.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moyo.MOYO.dto.ScheduleList;
import com.moyo.MOYO.repository.ScheduleListRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ScheduleListServiceImpl implements ScheduleListService {
	
	@Autowired
	ScheduleListRepository sListRepo;
	
	@Override
	public List<ScheduleList> selectAll() {
		log.trace("ScheduleListService - selectAll");
		return sListRepo.selectAll();
	}
	
	@Override
	public List<ScheduleList> selectAllByUser(int uId) {
		log.trace("ScheduleListService - selectAllByUser");
		return sListRepo.selectAllByUser(uId);
	}
	
	@Override
	public ScheduleList selectOne(int sListId) {
		log.trace("ScheduleListService - selectOne");
		return sListRepo.selectOne(sListId);
	}
	
	@Override
	public int create(ScheduleList scheduleList) {
		log.trace("ScheduleListService - create");
		return sListRepo.create(scheduleList);
	}
	
	@Override
	public int delete(int sListId) {
		log.trace("ScheduleListService - delete");
		return sListRepo.delete(sListId);
	}
	
	@Override
	public int update(ScheduleList scheduleList) {
		log.trace("ScheduleListService - update");
		return sListRepo.update(scheduleList);
	}

}
