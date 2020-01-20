package com.moyo.MOYO.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccompanyBoard {
	private int acBoardId;
	private int uId;
	private int nId;
	private int cId;
	private int tTypeId;
	private String title;
	private String contents;
	private String startDate;
	private String endDate;
	private String wantAge;
	private String wantGender;
	private String deadlineToggle;
	private String registerDate;
	private String updateDate;
}
