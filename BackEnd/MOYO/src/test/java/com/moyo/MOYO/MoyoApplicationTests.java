package com.moyo.MOYO;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.moyo.MOYO.repository.CommunityRepository;

import lombok.extern.slf4j.Slf4j;

@SpringBootTest
@Transactional
@Slf4j
class MoyoApplicationTests {
	
	@Autowired
	CommunityRepository cRepo;

	@Test
	void cRepoTest() {
		log.trace("왜안되지?");
		assertEquals(0, cRepo.selectAll().size());
	}

}
