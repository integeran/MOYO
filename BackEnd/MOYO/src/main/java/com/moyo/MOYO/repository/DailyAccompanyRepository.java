package com.moyo.MOYO.repository;

import java.util.List;

import com.moyo.MOYO.dto.DailyAccompany;

public interface DailyAccompanyRepository {
	public List<DailyAccompany> selectAll();
	
	public List<DailyAccompany> selectAllByUser(int uId);
	
	public DailyAccompany selectOne(int dAcId);
	
	public int create(DailyAccompany dailyAccompany);
	
	public int delete(int dAcId);
	
	public int update(DailyAccompany dailyAccompany);

}
