package com.exam.controller;

import java.util.HashSet;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.entity.Role;
import com.exam.entity.User;
import com.exam.entity.UserRole;
import com.exam.services.UserService;

@RestController
@CrossOrigin(origins="http://localhost:4200")

@RequestMapping("/user")

public class UserController {
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	@Autowired
	private UserService userService;
	//creating user
	@PostMapping("/")
	public User createUser(@RequestBody User user) throws Exception {
		user.setProfile("default.png");
		//encoding password with bcryptencoder
		user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));
		
		Set<UserRole> roles=new HashSet<>();
		Role role=new Role();
		role.setRoleId(45L);
		role.setRoleName("NORMAL");
		
		UserRole userRole =new UserRole();
		userRole.setUser(user);
		userRole.setRole(role);
		
		roles.add(userRole);
		
		return this.userService.createUser(user, roles);
		
		
	}
	//get user by username
	@GetMapping("/{userName}")
	public User getUser(@PathVariable("userName") String UserName) {
		return this.userService.getUser(UserName);
	
	}
	
	//delete user
	@DeleteMapping("/{userId}")
	public void deleteUser(@PathVariable("userId") Long userId){
		this.userService.deleteUser(userId);
		
	}
	//update user
	@PutMapping("/{userName}")
	public User updateUser(@RequestBody User user,@PathVariable("userName") String userName) {
		return this.userService.updateUser(user,userName);
		
	}
	

}
