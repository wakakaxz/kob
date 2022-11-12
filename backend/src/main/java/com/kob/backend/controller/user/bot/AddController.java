package com.kob.backend.controller.user.bot;

import com.kob.backend.service.user.bot.AddService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/user/bot/")
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class AddController {
    private final AddService addService;//注入接口

    @PostMapping("add")
    public Map<String,String> add(@RequestBody Map<String,String> data){
        return addService.add(data);
    }
}
