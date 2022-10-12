package com.qinzan.playdate.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.sun.istack.NotNull;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "playdate")
@JsonDeserialize(builder = Playdate.Builder.class)
// POJO class -> 没有任何逻辑功能的 class, eg. entity class
public class Playdate implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JsonProperty("date")
    @NotNull
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate date;

    @JsonProperty("start_time")
    @NotNull
    private LocalTime startTime;

    @JsonProperty("end_time")
    @NotNull
    private LocalTime endTime;

    @JsonProperty("visibility")
    @NotNull
    private boolean visibility;

    @JsonProperty("location")
    private String location;

    @JsonProperty("age")
    private String age;

    @ManyToOne
    @JoinColumn(name = "username")
    private User user;


    public Playdate() {}

    private Playdate(Builder builder) {
        this.id = builder.id;
        this.date = builder.date;
        this.startTime = builder.startTime;
        this.endTime = builder.endTime;
        this.visibility = builder.visibility;
        this.location = builder.location;
        this.age = builder.age;
        this.user = builder.user;
    }

    public Long getId() {
        return id;
    }

    public LocalDate getDate() {
        return date;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public User getUser() {
        return user;
    }

    public Playdate setUser(User user) {
        this.user = user;
        return this;
    }

    @PreRemove
    private void preRemove() {
        user.playdateList.remove(this);
    }

    public static class Builder {
        @JsonProperty("id")
        private Long id;

        @JsonProperty("date")
        private LocalDate date;

        @JsonProperty("start_time")
        private LocalTime startTime;
        @JsonProperty("end_time")
        private LocalTime endTime;

        @JsonProperty("visibility")
        private boolean visibility;
        @JsonProperty("location")
        private String location;

        @JsonProperty("age")
        private String age;

        @JsonProperty("user")
        private User user;



        public Builder setId(Long id) {
            this.id = id;
            return this;
        }

        public Builder setUser(User user) {
            this.user = user;
            return this;
        }

        public Builder setDate(LocalDate date) {
            this.date = date;
            return this;
        }

        public Builder setStartTime(LocalTime startTime) {
            this.startTime = startTime;
            return this;
        }

        public Builder setEndTime(LocalTime endTime) {
            this.endTime = endTime;
            return this;
        }

        public Builder setVisibility(boolean visibility) {
            this.visibility = visibility;
            return this;
        }

        public Builder setLocation(String location) {
            this.location = location;
            return this;
        }

        public Builder setAge(String age) {
            this.age = age;
            return this;
        }


        public Playdate build() {
            return new Playdate(this);
        }
    }
}