package com.moyo.MOYO.service;

import java.util.HashMap;
import java.util.List;

import com.moyo.MOYO.dto.AccompanyBoard;

public interface AccompanyBoardService {
	public List<AccompanyBoard> selectAll(String sorting);
	
	public AccompanyBoard selectOne(int acBoardId);
	
	public int create(AccompanyBoard accompanyBoard);
	
	public int delete(int acBoardId);
	
	public int update(AccompanyBoard accompanyBoard);
	
	public List<AccompanyBoard> selectFilter(HashMap<String, Object> filter);
	
	public List<AccompanyBoard> search(HashMap<String, Object> filter);

}
