package com.qinzan.playdate.controller;

import com.qinzan.playdate.model.Playdate;
import com.qinzan.playdate.model.User;
import com.qinzan.playdate.service.PlaydateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
public class PlaydateController {
    private PlaydateService playdateService;

    @Autowired
    public PlaydateController(PlaydateService playdateService) {
        this.playdateService = playdateService;
     }


    @GetMapping(value = "/playdates")
    public List<Playdate> listPlaydates(Principal principal) {
        return playdateService.listByUser(principal.getName());
    }

    @GetMapping(value = "/playdates/{playdateId}")
    public Playdate getPlaydate(@PathVariable Long playdateId, Principal principal) {
        return playdateService.findByIdAndHost(playdateId, principal.getName());
    }

    @PostMapping("/playdates")
    public void addPlaydate(
            @RequestParam("date") LocalDate date,
            @RequestParam("start_time")LocalTime startTime,
            @RequestParam("end_time")LocalTime endTime,
            @RequestParam("visibility") boolean visibility,
            @RequestParam("location") String location,
            @RequestParam("age") String age,
            Principal principal) {

        Playdate playdate = new Playdate.Builder()
                .setDate(date)
                .setStartTime(startTime)
                .setEndTime(endTime)
                .setVisibility(visibility)
                .setLocation(location)
                .setAge(age)
                .setUser(new User.Builder().setPhoneNumber(principal.getName()).build())
                .build();
    }

    @DeleteMapping("/stays/{stayId}")
    public void deletePlaydate(@PathVariable Long playdateId, Principal principal) {
        playdateService.delete(playdateId, principal.getName());
    }

}
