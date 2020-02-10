package com.moyo.MOYO.repository;

import java.util.List;

import com.moyo.MOYO.dto.Community;

public interface CommunityRepository {
	public List<Community> selectAll();
	
	public List<Community> selectAllByUser(int uId);
	
	public Community selectOne(int cmId);
	
	public int create(Community community);
	
	public int delete(int cmId);
	
	public int update(Community community);
	
}
