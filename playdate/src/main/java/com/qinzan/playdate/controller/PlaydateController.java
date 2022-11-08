package com.qinzan.playdate.controller;

import com.qinzan.playdate.model.Playdate;
import com.qinzan.playdate.model.User;
import com.qinzan.playdate.service.PlaydateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.zeromq.ZContext;
import org.zeromq.ZMQ;
import org.zeromq.ZMQ;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.InetAddress;
import java.net.Socket;
import java.security.Principal;
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

        String location = playdateBody.location;
        String link = null;
//        if (location != null && !location.isEmpty() && !location.isBlank()) {
//            char[] buffer = new char[1024];
//            try (
//                    Socket socket = new Socket("127.0.0.1", 5555);
//                    BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
//                    PrintWriter out = new PrintWriter(socket.getOutputStream())
//            ) {
//                out.write(location);
//                out.flush();
//                //noinspection ResultOfMethodCallIgnored
//                int length = in.read(buffer);
//                link = String.valueOf(buffer).substring(0, length);
//            } catch (IOException e) {
//                // ignore
//            }
//        }

        if (location != null && !location.isEmpty() && !location.isBlank()) {
            try (ZContext context = new ZContext()) {
                ZMQ.Socket socket = context.createSocket(ZMQ.PAIR);
                socket.connect("tcp://*:5555");
                socket.send(location.getBytes(), 0);
                Thread.sleep(100);
                byte[] reply = socket.recv(0);
                link = new String(reply, ZMQ.CHARSET);
                socket.close();
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }


        Playdate playdate = new Playdate.Builder()
                .setDate(playdateBody.date)
                .setStartTime(playdateBody.startTime)
                .setEndTime(playdateBody.endTime)
                .setVisibility(playdateBody.visibility)
                .setLocation(playdateBody.location)
                .setLocationLink(link)
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
                updatePlaydateBody.getStart_time(),
                updatePlaydateBody.getEnd_time(),
                updatePlaydateBody.isVisibility(),
                updatePlaydateBody.getLocation(),
                updatePlaydateBody.getAge()
        );
    }
}
