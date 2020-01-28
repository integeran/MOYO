package com.moyo.MOYO.service;

import java.util.HashMap;
import java.util.List;

import com.moyo.MOYO.dto.Postmap;
import com.moyo.MOYO.dto.Postmaplike;

public interface PostmapService {
	public List<Postmap> selectAll(HashMap<String, Double> map);
	
	public Postmap selectOne(int pmId);
	
	public int insertPostmap(Postmap postmap);
	
	public int updatePostmap(Postmap postmap);
	
	public int deletePostmap(int pmId);
	
	public int checkDuration(String today);
	
	public int likePostmap(Postmaplike postmaplike);
	
	public int deletePostmapLike(int pmLikeId);
	
	public int selectPostmapLike(int pmId);

	public boolean checkLikeDuplicate(int uId);
	
}