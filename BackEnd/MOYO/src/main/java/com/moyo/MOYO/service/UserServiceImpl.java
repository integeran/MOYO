package com.moyo.MOYO.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moyo.MOYO.dto.User;
import com.moyo.MOYO.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserServiceImpl implements UserService {
	
	@Autowired
	UserRepository uRepo;
	
	@Override
	public List<User> selectAll() {
		log.trace("UserService - selectAll");
		return uRepo.selectAll();
	}
	
	@Override
	public int registerUser(User user) {
		log.trace("UserService - registerUser");
		return uRepo.registerUser(user);
	}
	
	@Override
	public int deleteUser(int uId) {
		log.trace("UserService - deleteUser");
		return uRepo.deleteUser(uId);
	}
	
	@Override
	public int updateUser(User user) {
		log.trace("UserService - updateUser");
		return uRepo.updateUser(user);
	}

}
