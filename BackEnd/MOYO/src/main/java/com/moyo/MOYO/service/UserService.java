package com.moyo.MOYO.service;

import java.util.List;

import com.moyo.MOYO.dto.User;

public interface UserService {
	public List<User> selectAll();
	
	public int register(User user);
	
	public int delete(int uId);
	
	public int update(User user);

}
