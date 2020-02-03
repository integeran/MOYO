package com.moyo.MOYO.repository;

import java.util.List;

import com.moyo.MOYO.dto.DailyMemo;

public interface DailyMemoRepository {
	public List<DailyMemo> selectAll();
	
	public List<DailyMemo> selectAllByUser(int uId);
	
	public DailyMemo selectOne(int dMemoId);
	
	public int create(DailyMemo dailyMemo);
	
	public int delete(int dMemoId, int uId);
	
	public int update(DailyMemo dailyMemo);

}
