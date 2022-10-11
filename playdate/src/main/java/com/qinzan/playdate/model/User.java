package com.qinzan.playdate.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.sun.istack.NotNull;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;


import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "user")
@JsonDeserialize(builder = User.Builder.class)
public class User implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @JsonProperty("phoneNumber")
    private String phoneNumber;

    @JsonIgnore
    @NotNull
    @JsonProperty("password")
    private String password;

    @JsonProperty("name")
    private String name;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy="user")
    @Fetch(FetchMode.SUBSELECT)
    List<Playdate> playdateList;


    public User() {}

    private User(Builder builder) {
        this.phoneNumber = builder.phoneNumber;
        this.password = builder.password;
        this.name = builder.name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public User setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public User setPassword(String password) {
        this.password = password;
        return this;
    }

    public String getName() {
        return name;
    }

    public User setName(String name) {
        this.name = name;
        return this;
    }

    public static class Builder {
        @JsonProperty("phoneNumber")
        private String phoneNumber;

        @JsonProperty("password")
        private String password;

        @JsonProperty("name")
        private String name;

        public Builder() {
        }

        public Builder setPhoneNumber(String phoneNumber) {
            this.phoneNumber = phoneNumber;
            return this;
        }

        public Builder setName(String name) {
            this.name = name;
            return this;
        }

        public Builder setPassword(String password) {
            this.password = password;
            return this;
        }


        public User build() {
            return new User(this);
        }
    }
}
