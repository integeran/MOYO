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
	public int register(User user) {
		log.trace("UserService - register");
		return uRepo.register(user);
	}
	
	@Override
	public int delete(int uId) {
		log.trace("UserService - delete");
		return uRepo.delete(uId);
	}
	
	@Override
	public int update(User user) {
		log.trace("UserService - update");
		return uRepo.update(user);
	}

}
