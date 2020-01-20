package com.moyo.MOYO.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
	
	private int uId;
	private String token;
	private String nickname;
	private int age;
	private String gender;
	private String image;
	private int beforePsId;
	private int AfterPsId;
	private String kakaoId;
	private String registerDate;
	private String updateDate;
}
