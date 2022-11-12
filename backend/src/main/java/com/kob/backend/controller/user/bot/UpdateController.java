
package com.kob.backend.controller.user.bot;

import com.kob.backend.service.user.bot.UpdateService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/user/bot/")
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class UpdateController {
    private final UpdateService updateService;

    @PostMapping("update")
    public Map<String, String> update(@RequestBody Map<String, String> data) {
        return updateService.update(data);
    }
}