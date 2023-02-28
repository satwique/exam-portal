package com.exam.services.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.entity.User;
import com.exam.entity.UserRole;
import com.exam.repository.RoleRepository;
import com.exam.repository.UserRepository;
import com.exam.services.UserService;

@Service
public class UserServiceImpl  implements UserService{
	
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;

	
		//creating user
	@Override
	public User createUser(User user, Set<UserRole> userRoles) throws Exception {
		
		User local=this.userRepository.findByUserName(user.getUserName());
		if(local!=null) {
			System.out.println("User is already there");
			throw new Exception("User is already present!!");
		}
		else {
			for(UserRole ur:userRoles) {
				roleRepository.save(ur.getRole());
			}
			user.getUserRoles().addAll(userRoles);
			local=this.userRepository.save(user);
		}
		return local;
	}

	//getting user by username
	@Override
	public User getUser(String userName) {
		// TODO Auto-generated method stub
		return this.userRepository.findByUserName(userName);
	}
	//delete user by id
	@Override
	public void deleteUser(Long userId) {
		this.userRepository.deleteById(userId);
		
	}
	//update user
	@Override
	public User updateUser(User user,String userName) {
		// TODO Auto-generated method stub
		User user1=userRepository.findByUserName(userName);
		if(user1==null) {
			System.out.println("username not found");
			return null;
		}
		else {
		user1.setEmail(user.getEmail());
		user1.setFirstName(user.getFirstName());
		user1.setLastName(user.getLastName());
		user1.setUserName(user.getUserName());
		user1.setPhone(user.getPhone());
		user1.setProfile(user.getProfile());
		userRepository.save(user1);
		return user1;
		}
	}
	
	

}
