package com.exam.services;

import java.util.Set;

import com.exam.entity.User;
import com.exam.entity.UserRole;

public interface UserService {
	
	//creating user
	public User createUser(User user,Set<UserRole> userRoles) throws Exception;
	//get user by user name
	public User getUser(String userName);
	
	//delete user
	public void deleteUser(Long userId);
	//update user
	public User updateUser(User user,String userName);

}
