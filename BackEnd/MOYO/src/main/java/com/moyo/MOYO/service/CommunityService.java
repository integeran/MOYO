package com.moyo.MOYO.service;

import java.util.List;

import com.moyo.MOYO.dto.Community;

public interface CommunityService {
	public List<Community> selectAll();
	
	public List<Community> selectAllByUser(int uId);
	
	public Community selectOne(int cmId);
	
	public int create(Community community);
	
	public int delete(int cmId);
	
	public int update(Community community);
}
