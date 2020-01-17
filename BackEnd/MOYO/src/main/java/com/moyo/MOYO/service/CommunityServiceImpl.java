package com.moyo.MOYO.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
