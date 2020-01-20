package com.moyo.MOYO.repository;

import java.util.List;

import com.moyo.MOYO.dto.AccompanyBoard;

public interface AccompanyBoardRepository {
	public List<AccompanyBoard> selectAll();
	
	public int create(AccompanyBoard accompanyBoard);
	
	public int delete(int acBoardId);
	
	public int update(AccompanyBoard accompanyBoard);

}
