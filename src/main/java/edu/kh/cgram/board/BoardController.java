package edu.kh.cgram.board;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("board")
public class BoardController {
	@GetMapping("myActivity")
	public String myActivityPage() {
		return "/board/myActivity";
	}
}