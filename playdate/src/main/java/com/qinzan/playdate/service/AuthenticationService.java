package com.qinzan.playdate.service;

import com.qinzan.playdate.exception.UserNotExistException;
import com.qinzan.playdate.model.Token;
import com.qinzan.playdate.model.User;
import com.qinzan.playdate.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;


@Service
public class AuthenticationService {
    private AuthenticationManager authenticationManager;
    private JwtUtil jwtUtil;

    @Autowired
    public AuthenticationService(AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    public Token authenticate(User user) throws UserNotExistException {
        Authentication auth = null;
        try {
            auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getPhoneNumber(), user.getPassword()));
        } catch (AuthenticationException exception) {
            throw new UserNotExistException("User Doesn't Exist");
        }

        if (auth == null || !auth.isAuthenticated() ) {
            throw new UserNotExistException("User Doesn't Exist");
        }
        return new Token(jwtUtil.generateToken(user.getPhoneNumber()));
    }

}

