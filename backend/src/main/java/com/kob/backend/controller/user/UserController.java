package com.kob.backend.controller.user;

import com.kob.backend.mapper.UserMapper;
import com.kob.backend.pojo.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("user")
@RequiredArgsConstructor(onConstructor_={@Autowired})
public class UserController {
    private final UserMapper userMapper;

    @GetMapping("all")
    public List<User> getAllUser() {
        return userMapper.selectList(null);
    }

}
