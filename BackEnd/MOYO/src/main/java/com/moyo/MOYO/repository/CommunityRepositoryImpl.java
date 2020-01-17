package com.moyo.MOYO.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.moyo.MOYO.dto.Community;
import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
public class CommunityRepositoryImpl implements CommunityRepository {
	private String ns = "moyo.communitymapper.";
	
	@Autowired
	SqlSession session;
	
	@Override
	public List<Community> selectAll() {
		log.trace("CommunityRepository - selectAll");
		return session.selectList(ns + "selectAll");
	}
}
