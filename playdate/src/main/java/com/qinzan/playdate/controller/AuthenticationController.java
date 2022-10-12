package com.qinzan.playdate.controller;

import com.qinzan.playdate.model.Token;
import com.qinzan.playdate.model.User;
import com.qinzan.playdate.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {
    private AuthenticationService authenticationService;

    @Autowired
    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/authenticate")
    public Token authenticateUser(@RequestBody User user) {
        return authenticationService.authenticate(user);
    }


}
