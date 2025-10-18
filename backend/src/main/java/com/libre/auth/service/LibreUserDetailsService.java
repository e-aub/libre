package com.libre.auth.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.libre.auth.security.LibreUserDetails;
import com.libre.user.model.User;
import com.libre.user.repository.UserRepository;


@Service
public class LibreUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public LibreUserDetailsService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
            User user = userRepository.findByUsername(username).orElseThrow(()-> new UsernameNotFoundException(
                "User not found with username: " + username
            ));
            return new LibreUserDetails(user);
    }


}
