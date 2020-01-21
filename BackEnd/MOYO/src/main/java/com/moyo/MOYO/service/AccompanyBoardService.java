package com.moyo.MOYO.service;

import java.util.List;

import com.moyo.MOYO.dto.AccompanyBoard;

public interface AccompanyBoardService {
	public List<AccompanyBoard> selectAll();
	
	public int create(AccompanyBoard accompanyBoard);
	
	public int delete(int acBoardId);
	
	public int update(AccompanyBoard accompanyBoard);

}
