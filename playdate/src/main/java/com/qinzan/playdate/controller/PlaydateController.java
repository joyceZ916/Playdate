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


    @GetMapping(value = "/myplaydates")
    public List<Playdate> listMyPlaydates(Principal principal) {
        return playdateService.listByUser(principal.getName());
    }

    @GetMapping(value = "/playdates")
    public List<Playdate> listVisiblePlaydates() {
        return playdateService.listVisible();
    }



    @GetMapping(value = "/playdates/{playdateId}")
    public Playdate getPlaydate(@PathVariable Long playdateId, Principal principal) {
        return playdateService.findByIdAndHost(playdateId, principal.getName());
    }

    @PostMapping("/playdates")
    public void addPlaydate(
            @RequestBody AddPlaydateBody playdateBody,
            Principal principal) {

        Playdate playdate = new Playdate.Builder()
                .setDate(playdateBody.date)
                .setStartTime(playdateBody.startTime)
                .setEndTime(playdateBody.endTime)
                .setVisibility(playdateBody.visibility)
                .setLocation(playdateBody.location)
                .setAge(playdateBody.age)
                .setUser(new User.Builder().setUsername(principal.getName()).build())
                .build();
        playdateService.add(playdate);
    }

    @DeleteMapping("/playdates/{playdateId}")
    public void deletePlaydate(@PathVariable Long playdateId, Principal principal) {
        playdateService.delete(playdateId, principal.getName());
    }

    @PutMapping("/playdates/{playdateId}")
    public void updatePlaydate(@PathVariable Long playdateId, @RequestBody UpdatePlaydateBody updatePlaydateBody, Principal principal) {
        playdateService.update(
                playdateId,
                principal.getName(),
                updatePlaydateBody.getDate(),
                updatePlaydateBody.getStartTime(),
                updatePlaydateBody.getEndTime(),
                updatePlaydateBody.isVisibility(),
                updatePlaydateBody.getLocation(),
                updatePlaydateBody.getAge()
        );
    }
}
