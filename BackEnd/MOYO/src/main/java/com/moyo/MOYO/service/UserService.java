package com.moyo.MOYO.service;

import java.util.List;

import com.moyo.MOYO.dto.User;

public interface UserService {
	public List<User> selectAll();
	
	public int registerUser(User user);
	
	public int deleteUser(int uId);
	
	public int updateUser(User user);

}
