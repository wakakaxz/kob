package com.kob.backend.controller.user.account;

import com.kob.backend.service.user.account.RegisterService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/user/account/")
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class RegisterController {
    private final RegisterService registerService;

    @PostMapping("register")
    public Map<String, String> register(@RequestBody Map<String, String> map) {
        String username = map.get("username");
        String password = map.get("password");
        String confirmedPassword = map.get("confirmedPassword");
        return registerService.register(username, password, confirmedPassword);
    }


}
