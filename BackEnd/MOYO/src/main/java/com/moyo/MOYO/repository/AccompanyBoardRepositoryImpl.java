package com.moyo.MOYO.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.moyo.MOYO.dto.AccompanyBoard;

import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
public class AccompanyBoardRepositoryImpl implements AccompanyBoardRepository {
	private String ns = "moyo.accompanyboardmapper.";
	
	@Autowired
	SqlSession session;
	
	@Override
	public List<AccompanyBoard> selectAll(Map<String, Object> map) {
		log.trace("AccompanyBoardRepository - selectAll : ",map);
		return session.selectList(ns + "selectAll", map);
	}
	
	@Override
	public AccompanyBoard selectOne(int acBoardId) {
		log.trace("AccompanyBoardRepository - selectOne");
		return session.selectOne(ns + "selectOne",acBoardId);
	}
	
	@Override
	public int create(AccompanyBoard accompanyBoard) {
		log.trace("AccompanyBoardRepository - create");
		return session.insert(ns + "createAccompanyBoard", accompanyBoard);
	}
	
	@Override
	public int delete(int acBoardId) {
		log.trace("AccompanyBoardRepository - delete");
		return session.delete(ns + "deleteAccompanyBoard", acBoardId);
	}
	
	@Override
	public int update(AccompanyBoard accompanyBoard) {
		log.trace("AccompanyBoardRepository - update");
		return session.update(ns + "updateAccompanyBoard", accompanyBoard);
	}
	@Override
	public List<AccompanyBoard> selectFilter(HashMap<String, Object> filter) {
		log.trace("AccompanyBoardRepository - selectFilter : ", filter);
		return session.selectList(ns + "selectFilter", filter);
	}

	@Override
	public List<AccompanyBoard> search(HashMap<String, Object> filter) {
		log.trace("AccompanyBoardRepository - search : ", filter);
		return session.selectList(ns + "search", filter);
	}
}
