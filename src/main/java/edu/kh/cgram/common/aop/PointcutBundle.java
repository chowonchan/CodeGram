package edu.kh.cgram.common.aop;

import org.aspectj.lang.annotation.Pointcut;

public class PointcutBundle {
	
	// 모든 컨트롤러 지정
	@Pointcut("execution(* edu.kh.cgram..*Controller*.*(..))")
	public void controllerPointcut() {}
	
	// 모든 ServiceImpl 지정
	@Pointcut("execution(* edu.kh.cgram..*ServiceImpl*.*(..))")
	public void ServiceImplPointcut() {}

}
