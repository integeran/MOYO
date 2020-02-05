package com.moyo.MOYO.service;

import java.sql.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
	public List<ScheduleList> selectAllByOneDay(int uId, String day) {
		log.trace("ScheduleListService - selectAllByOneDay");
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("uId", uId);
		param.put("day", day);
		return sListRepo.selectAllByOneDay(param);
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
	public int delete(int sListId, int uId) {
		log.trace("ScheduleListService - delete");
		return sListRepo.delete(sListId, uId);
	}
	
	@Override
	public int update(ScheduleList scheduleList) {
		log.trace("ScheduleListService - update");
		return sListRepo.update(scheduleList);
	}

}
