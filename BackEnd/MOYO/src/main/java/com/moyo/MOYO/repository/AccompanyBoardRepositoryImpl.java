package com.moyo.MOYO.repository;

import java.util.List;

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
	public List<AccompanyBoard> selectAll() {
		log.trace("AccompanyBoardRepository - selectAll");
		return session.selectList(ns + "selectAll");
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
	

}
