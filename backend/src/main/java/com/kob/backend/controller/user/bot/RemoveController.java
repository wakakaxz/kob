package com.kob.backend.controller.user.bot;

import com.kob.backend.service.user.bot.RemoveService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/user/bot/")
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class RemoveController {
    private final RemoveService removeService;

    @PostMapping("remove")
    public Map<String, String> remove(@RequestBody Map<String, String> data) {
        return removeService.remove(data);
    }
}
