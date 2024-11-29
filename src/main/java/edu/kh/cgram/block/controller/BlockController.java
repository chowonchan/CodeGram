package edu.kh.cgram.block.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;

import edu.kh.cgram.block.service.BlockService;

@RestController
@SessionAttributes({"loginMember"})
@RequestMapping("/block")
public class BlockController {
	
	private final BlockService service;
	
	public BlockController(BlockService blockService) { this.service = blockService; }
	
	

}
