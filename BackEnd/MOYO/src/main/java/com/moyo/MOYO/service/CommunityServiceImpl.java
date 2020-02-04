package com.moyo.MOYO.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.moyo.MOYO.dto.Community;
import com.moyo.MOYO.repository.CommunityRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class CommunityServiceImpl implements CommunityService {
	
	@Autowired
	CommunityRepository cRepo;
	
	@Override
	public List<Community> selectAll() {
		log.trace("CommunityService - selectAll");
		return cRepo.selectAll();
	}
	
	@Override
	public List<Community> selectAllByUser(int uId) {
		log.trace("CommunityService - selectAllByUser");
		return cRepo.selectAllByUser(uId);
	}
	
	@Override
	public Community selectOne(int cmId) {
		log.trace("CommunityService - selectOne");
		return cRepo.selectOne(cmId);
	}
	
	@Override
	@Transactional
	public int create(Community community) {
		log.trace("CommunityService - create");
		return cRepo.create(community);
	}
	
	@Override
	@Transactional
	public int delete(int cmId) {
		log.trace("CommunityService - delete");
		return cRepo.delete(cmId);
	}
	
	@Override
	@Transactional
	public int update(Community community) {
		log.trace("CommunityService - update");
		return cRepo.update(community);
	}
	
}
