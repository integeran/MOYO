package com.moyo.MOYO.repository;

import java.util.List;

import com.moyo.MOYO.dto.User;

public interface UserRepository {
	public List<User> selectAll();
	
	public int registerUser(User user);
	
	public int deleteUser(int uId);
	
	public int updateUser(User user);
}
