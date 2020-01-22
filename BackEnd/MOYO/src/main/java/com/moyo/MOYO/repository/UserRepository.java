package com.moyo.MOYO.repository;

import java.util.List;

import com.moyo.MOYO.dto.User;

public interface UserRepository {
	public List<User> selectAll();
	
	public User selectOne(int uId);
	
	public User selectOneBySocialId(String socialId, int provider);
	
	public User selectOneByNickname(String nickname);
	
	public int register(User user);

	public int delete(int uId);
	
	public int update(User user);

}
