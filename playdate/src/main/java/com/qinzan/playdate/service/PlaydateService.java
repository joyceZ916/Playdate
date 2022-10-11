package com.qinzan.playdate.service;

import com.qinzan.playdate.model.*;

import com.qinzan.playdate.repository.PlaydateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class PlaydateService {
    private PlaydateRepository playdateRepository;


    @Autowired
    public void PlaydateService(PlaydateRepository playdateRepository) {
        this.playdateRepository = playdateRepository;
    }

    public List<Playdate> listByUser(String phoneNumber) {
        return playdateRepository.findByUser(new User.Builder().setPhoneNumber(phoneNumber).build());
    }

    public Playdate findByIdAndHost(Long playdateId, String phoneNumber)  {
        Playdate playdate = playdateRepository.findByIdAndUser(playdateId, new User.Builder().setPhoneNumber(phoneNumber).build());
        return playdate;
    }


    public void add(Playdate playdate) {
        playdateRepository.save(playdate);
    }

    public void delete(Long playdateId, String phoneNumber) {
        Playdate playdate = playdateRepository.findByIdAndUser(playdateId, new User.Builder().setPhoneNumber(phoneNumber).build());

        playdateRepository.deleteById(playdateId);
    }
    public void update(Long playdateId, User user, LocalDate date, LocalTime startTime, LocalTime endTime, boolean visibility, String location, String age) {
        Playdate playdate = playdateRepository.findByIdAndUser(playdateId, new User.Builder().setPhoneNumber(user.getPhoneNumber()).build());

        Playdate.Builder builder = new Playdate.Builder();
        builder.setId(playdate.getId());
        builder.setUser(user);
        builder.setDate(date);
        builder.setStartTime(startTime);
        builder.setEndTime(endTime);
        builder.setVisibility(visibility);
        builder.setLocation(location);
        builder.setAge(age);

        playdateRepository.save(builder.build());
    }
}
