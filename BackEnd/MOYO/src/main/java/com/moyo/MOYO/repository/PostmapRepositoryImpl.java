package com.moyo.MOYO.repository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.moyo.MOYO.dto.Postmap;
import com.moyo.MOYO.dto.Postmaplike;

import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
@Transactional
public class PostmapRepositoryImpl implements PostmapRepository{
	private String ns = "moyo.postmapmapper.";
	
	@Autowired
	SqlSession session;

	@Override
	public List<Postmap> selectAll(HashMap<String, Object> map) {
		log.trace("PostmapRepository - selectAll : ",map);
		List<Postmap> list = session.selectList(ns+ "selectAll",map);
		List<Postmap> postmapList = new ArrayList<>();
		
		double latitude = Math.toRadians((double) map.get("latitude"));
		double longitude = Math.toRadians((double) map.get("longitude"));
		for(Postmap post : list) {
			double pLat = Math.toRadians(post.getLatitude());
			double pLng = Math.toRadians(post.getLongitude());
			double distance = ( 6371 * Math.acos( Math.cos( latitude ) * Math.cos( pLat )
			          * Math.cos( pLng - longitude )
			          + Math.sin( latitude ) * Math.sin( pLat ) ) );
			if(distance < 5) {
				postmapList.add(post);
			}
		}
		
		return postmapList;
	}
	
	@Override
	public List<Postmap> selectExceptTop(HashMap<String, Object> map) {
		log.trace("PostmapRepository - selectExceptTop : ",map);
		List<Postmap> list = selectAll(map);
		
		Collections.sort(list, new Comparator<Postmap>() {
			@Override
			public int compare(Postmap o1, Postmap o2) {
				return o2.getLikes() - o1.getLikes();
			}
		});
		
		for(int i=PostmapRepository.TOP-1; i>=0; i--) {
			if(list.size() > i) {
				list.remove(i);
			}
		}
		
		return list;
	}
	
	@Override
	public List<Postmap> selectTop(HashMap<String, Object> map) {
		log.trace("PostmapRepository - selectTop3 : ",map);
		List<Postmap> list = selectAll(map);
		
		Collections.sort(list, new Comparator<Postmap>() {
			@Override
			public int compare(Postmap o1, Postmap o2) {
				return o2.getLikes() - o1.getLikes();
			}
		});
		
		List<Postmap> result = new ArrayList<Postmap>();
		for(int i=0; i<PostmapRepository.TOP; i++) {
			if(list.size() > i) {
				result.add(list.get(i));
			}
		}
		
		return result;
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
	@Transactional
	public int updatePostmap(Postmap postmap) {
		log.trace("PostmapRepository - updatePostmap : ",postmap);
		return session.update(ns+ "updatePostmap",postmap);
	}

	@Override
	@Transactional
	public int deletePostmap(int pmId) {
		log.trace("PostmapRepository - deletePostmap : ",pmId);
		return session.delete(ns+ "deletePostmap",pmId);
	}

	@Override
	@Transactional
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
	public int checkLikeDuplicate(Postmaplike postmaplike) {
		return session.delete(ns+"checkLikeDuplicate",postmaplike);
	}

	@Override
	public Postmaplike selectLikeOne(Postmaplike postmaplike) {
		return session.selectOne(ns + "selectLikeOne",postmaplike);
	}
}
