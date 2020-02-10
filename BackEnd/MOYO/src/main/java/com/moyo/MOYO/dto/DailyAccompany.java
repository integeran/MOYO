package com.moyo.MOYO.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DailyAccompany {
	private int dAcId;
	private int uId;
	private int accompanyId;
	private String day;
	private String registerDate;
	private String updateDate;
	private String nickname;
	private String accompanyNickname;
	private String accompanyImage;
}
