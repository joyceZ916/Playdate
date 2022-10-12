package com.qinzan.playdate.service;

import com.qinzan.playdate.model.*;

import com.qinzan.playdate.repository.PlaydateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class PlaydateService {
    private PlaydateRepository playdateRepository;

    @Autowired
    public void PlaydateService(
            PlaydateRepository playdateRepository) {
        this.playdateRepository = playdateRepository;
    }

    public List<Playdate> listByUser(String username) {
        return playdateRepository.findByUser(new User.Builder().setUsername(username).build());
    }

    public List<Playdate> listVisible() {
        return playdateRepository.findByVisibility(true);
    }

    public Playdate findByIdAndHost(Long playdateId, String username)  {
        Playdate playdate = playdateRepository.findByIdAndUser(playdateId, new User.Builder().setUsername(username).build());
        if (playdate == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "playdate not found");
        }
        return playdate;
    }


    public void add(Playdate playdate) {
        playdateRepository.save(playdate);
    }

    @Transactional(isolation = Isolation.SERIALIZABLE)
    public void delete(Long playdateId, String username) {
        Playdate playdate = playdateRepository.findByIdAndUser(playdateId, new User.Builder().setUsername(username).build());
        if (playdate == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "playdate not found");
        }

        playdateRepository.delete(playdate);
    }

    public void update(Long playdateId, String username, LocalDate date, LocalTime startTime, LocalTime endTime, boolean visibility, String location, String age) {
        User user = new User.Builder().setUsername(username).build();
        Playdate playdate = playdateRepository.findByIdAndUser(playdateId, user);

        if (playdate == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "playdate not found");
        }

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
