package com.kob.backend.controller.user.bot;

import com.kob.backend.pojo.Bot;
import com.kob.backend.service.user.bot.GetListService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user/bot/")
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class GetListController {
    private final GetListService getListService;

    @GetMapping("getList/")
    public List<Bot> getList(){
        return getListService.getList();
    }

}
