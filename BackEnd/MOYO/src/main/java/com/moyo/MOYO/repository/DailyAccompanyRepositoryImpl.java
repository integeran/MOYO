package com.moyo.MOYO.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.moyo.MOYO.dto.DailyAccompany;

import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
public class DailyAccompanyRepositoryImpl implements DailyAccompanyRepository {
	private String ns = "moyo.dailyaccompanymapper.";
	
	@Autowired
	SqlSession session;
	
	@Override
	public List<DailyAccompany> selectAll() {
		log.trace("DailyAccompanyRepository - selectAll");
		return session.selectList(ns + "selectAll");
	}
	
	@Override
	public List<DailyAccompany> selectAllByUser(int uId) {
		log.trace("DailyAccompanyRepository - selectAllByUser");
		return session.selectList(ns + "selectAllByUser", uId);
	}
	
	@Override
	public DailyAccompany selectOne(int dAcId) {
		log.trace("DailyAccompanyRepository - selectOne");
		return session.selectOne(ns + "selectOne", dAcId);
	}
	
	@Override
	public int create(DailyAccompany dailyAccompany) {
		log.trace("DailyAccompanyRepository - create");
		return session.insert(ns + "createDailyAccompany", dailyAccompany);
	}
	
	@Override
	public int delete(Map<String, Integer> param) {
		log.trace("DailyAccompanyRepository - delete");
		return session.delete(ns + "deleteDailyAccompany", param);
	}
	
	@Override
	public int update(DailyAccompany dailyAccompany) {
		log.trace("DailyAccompanyRepository - update");
		return session.insert(ns + "updateDailyAccompany", dailyAccompany);
	}
	

}
