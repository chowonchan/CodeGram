package edu.kh.cgram.myactivity.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import edu.kh.cgram.myactivity.service.MyActivityService;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("myActivity")
@RequiredArgsConstructor
public class MyActivityController {
	
	private final MyActivityService service;
	
}
