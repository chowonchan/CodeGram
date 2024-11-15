package edu.kh.cgram.member.util;

public class HangulUtils {
	 // 한글 초성을 추출하는 메서드
  public static String getChosungPattern(String keyword) {
      StringBuilder pattern = new StringBuilder();
      String[] chosungs = {
      		"[가-깋]", // ㄱ
          "[나-닣]", // ㄴ
          "[다-딯]", // ㄷ
          "[라-맇]", // ㄹ
          "[마-밓]", // ㅁ
          "[바-빟]", // ㅂ
          "[사-싷]", // ㅅ
          "[아-잏]", // ㅇ
          "[자-짛]", // ㅈ
          "[차-칳]", // ㅊ
          "[카-킿]", // ㅋ
          "[타-팋]", // ㅌ
          "[파-핗]", // ㅍ
          "[하-힣]"  // ㅎ
      };
      
      for(int i = 0; i < keyword.length(); i++) {
      	char ch = keyword.charAt(i);
      	switch (ch) {
      		case 'ㄱ': pattern.append(chosungs[0]); break;
      		case 'ㄴ': pattern.append(chosungs[1]); break;
      		case 'ㄷ': pattern.append(chosungs[2]); break;
      		case 'ㄹ': pattern.append(chosungs[3]); break;
      		case 'ㅁ': pattern.append(chosungs[4]); break;
      		case 'ㅂ': pattern.append(chosungs[5]); break;
      		case 'ㅅ': pattern.append(chosungs[6]); break;
      		case 'ㅇ': pattern.append(chosungs[7]); break;
      		case 'ㅈ': pattern.append(chosungs[8]); break;
      		case 'ㅊ': pattern.append(chosungs[9]); break;
      		case 'ㅋ': pattern.append(chosungs[10]); break;
      		case 'ㅌ': pattern.append(chosungs[11]); break;
      		case 'ㅍ': pattern.append(chosungs[12]); break;
      		case 'ㅎ': pattern.append(chosungs[13]); break;
      		default: pattern.append(ch); // 초성이 아닌 경우 그대로 추가
      	}
      }
      return pattern.toString();
  }
      
}
