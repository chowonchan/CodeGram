package edu.kh.cgram.common.util;

import java.text.SimpleDateFormat;

public class FileUtil {
	
	public static int seqNum = 1;
	

	public static String rename(String originalFileName) {

		int index = originalFileName.lastIndexOf(".");

		String ext = originalFileName.substring(index);

		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");

		String time = sdf.format(new java.util.Date());

		String number = String.format("%05d", seqNum);
		
		seqNum++; // 1 증가
		if(seqNum == 100000) seqNum = 1; // 1 ~ 99999 반복
		

		return time + "_" + number + ext;
	}

}
