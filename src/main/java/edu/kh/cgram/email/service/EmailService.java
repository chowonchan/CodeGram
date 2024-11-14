package edu.kh.cgram.email.service;

import java.util.Map;

public interface EmailService {

	int sendEmail(String string, String email);

	boolean checkAuthKey(Map<String, String> map);

}
