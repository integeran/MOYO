package com.moyo.MOYO.repository;

import java.util.List;

import com.moyo.MOYO.dto.Community;

public interface CommunityRepository {
	public List<Community> selectAll();
}
