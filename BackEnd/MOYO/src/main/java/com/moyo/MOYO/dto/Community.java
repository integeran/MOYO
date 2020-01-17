package com.moyo.MOYO.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Community {
	private int cmId;
	private int uId;
	private int cId;
	private int tTypeId;
	private String title;
	private String contents;
	private int views;
	private String registerDate;
	private String updateDate;
}
