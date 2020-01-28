package com.moyo.MOYO.repository;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.moyo.MOYO.dto.Postmap;
import com.moyo.MOYO.dto.Postmaplike;

import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
public class PostmapRepositoryImpl implements PostmapRepository{
	private String ns = "moyo.postmapmapper.";
	
	@Autowired
	SqlSession session;

	@Override
	public List<Postmap> selectAll(HashMap<String, Double> map) {
		log.trace("PostmapRepository - selectAll : ",map);
		return session.selectList(ns+ "selectAll",map);
	}

	@Override
	public Postmap selectOne(int pmId) {
		log.trace("PostmapRepository - selectOne : ",pmId);
		return session.selectOne(ns+ "selectOne",pmId);
	}

	@Override
	public int insertPostmap(Postmap postmap) {
		log.trace("PostmapRepository - insertPostmap : ",postmap);
		return session.insert(ns+ "insertPostmap",postmap);
	}

	@Override
	public int updatePostmap(Postmap postmap) {
		log.trace("PostmapRepository - updatePostmap : ",postmap);
		return session.update(ns+ "updatePostmap",postmap);
	}

	@Override
	public int deletePostmap(int pmId) {
		log.trace("PostmapRepository - deletePostmap : ",pmId);
		return session.delete(ns+ "deletePostmap",pmId);
	}

	@Override
	public int checkDuration(String today) {
		log.trace("PostmapRepository - checkDuration : ",today);
		return session.delete(ns+ "checkDuration", today);
	}

	@Override
	public int insertPostmapLike(Postmaplike postmaplike) {
		log.trace("PostmapRepository - insertPostmapLike : ",postmaplike);
		return session.insert(ns+ "insertPostmapLike", postmaplike);
	}

	@Override
	public int deletePostmapLike(int pmLikeId) {
		log.trace("PostmapRepository - deletePostmapLike : ",pmLikeId);
		return session.delete(ns+ "deletePostmapLike",pmLikeId);
	}

	@Override
	public int selectPostmapLike(int pmId) {
		log.trace("PostmapRepository - selectPostmapLike : ",pmId);
		return session.selectOne(ns + "selectPostmapLike",pmId);
	}

	@Override
	public boolean checkLikeDuplicate(int uId) {
		return session.selectOne(ns+"checkLikeDuplicate",uId);
	}
	
	
}
