package com.moyo.MOYO.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.moyo.MOYO.dto.User;

import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
public class UserRepositoryImpl implements UserRepository {
	private String ns = "moyo.usermapper.";
	
	@Autowired
	SqlSession session;
	
	@Override
	public List<User> selectAll() {
		log.trace("UserRepository - selectAll");
		return session.selectList(ns + "selectAll");
	}

	@Override
	public int register(User user) {
		log.trace("UserRepository - register");
		return session.insert(ns + "registerUser", user);
	}
	
    @Override
    public int delete(int uId) {
    	log.trace("UserRepository - delete");
		return session.delete(ns + "deleteUser", uId);
    }
    
    @Override
    public int update(User user) {
    	log.trace("UserRepository - update");
    	return session.update(ns + "updateUser", user);
    }
	
}