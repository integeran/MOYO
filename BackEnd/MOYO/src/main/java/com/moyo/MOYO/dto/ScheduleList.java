package com.moyo.MOYO.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleList {
	private int sListId;
	private int uId;
	private String nickname;
	private int nId;
	private String nation;
	private int cId;
	private String city;
	private String startDate;
	private String endDate;
	private String registerDate;
	private String updateDate;
}
