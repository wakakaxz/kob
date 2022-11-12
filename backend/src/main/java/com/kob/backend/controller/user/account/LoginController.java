package com.kob.backend.controller.user.account;

import com.kob.backend.service.user.account.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/user/account/")
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class LoginController {
    private final LoginService loginService;

    @PostMapping("token")
    public Map<String, String> getToken(@RequestBody Map<String, String> map) {
        String username = map.get("username");
        String password = map.get("password");
        return loginService.getToken(username, password);
    }
}
