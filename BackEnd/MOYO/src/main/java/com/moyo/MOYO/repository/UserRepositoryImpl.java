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
	public int registerUser(User user) {
		log.trace("UserRepository - registerUser");
		return session.insert(ns + "registerUser", user);
	}
	
    @Override
    public int deleteUser(int uId) {
    	log.trace("UserRepository - deleteUser");
		return session.delete(ns + "deleteUser", uId);
    }
    
    @Override
    public int updateUser(User user) {
    	log.trace("UserRepository - updateUser");
    	return session.update(ns + "updateUser", user);
    }
	
}
