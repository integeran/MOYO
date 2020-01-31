package com.moyo.MOYO.repository;

import java.util.List;

import com.moyo.MOYO.dto.ScheduleList;

public interface ScheduleListRepository {
	public List<ScheduleList> selectAll();
	
	public List<ScheduleList> selectAllByUser(int uId);
	
	public ScheduleList selectOne(int sListId);
	
	public int create(ScheduleList scheduleList);
	
	public int delete(int sListId, int uId);
	
	public int update(ScheduleList scheduleList);

}
