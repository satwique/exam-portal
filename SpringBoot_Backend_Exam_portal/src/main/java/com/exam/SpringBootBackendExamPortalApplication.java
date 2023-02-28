package com.exam;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.exam.entity.Role;
import com.exam.entity.User;
import com.exam.entity.UserRole;
import com.exam.services.UserService;

@SpringBootApplication
public class SpringBootBackendExamPortalApplication implements CommandLineRunner {
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	@Autowired
	private UserService userService;

	public static void main(String[] args) {
		SpringApplication.run(SpringBootBackendExamPortalApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		System.out.println("staring code");
		/*User user =new User();
		user.setFirstName("satwique");
		user.setLastName("mishra");
		user.setUserName("satwique");
		user.setPassword(this.bCryptPasswordEncoder.encode("sat"));
		user.setEmail("satwique2000");
		user.setPhone("99837403388");
		user.setProfile("dafault.png");
	
		Role role=new Role();
		role.setRoleId(44L);
		role.setRoleName("ADMIN");
		
		Set<UserRole> userRoleSet=new HashSet<>();
		UserRole userRole=new UserRole();
		userRole.setRole(role);
		userRole.setUser(user);
		userRoleSet.add(userRole);
		
		User user1=this.userService.createUser(user, userRoleSet);
		System.out.println(user1.getUserName());*/
		
		
		
	}
	

}
