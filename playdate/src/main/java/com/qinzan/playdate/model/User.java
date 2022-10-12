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
//    @JsonProperty("phoneNumber")
//    private String phoneNumber;
    @JsonProperty("username")
    private String username;

    @JsonIgnore
    @NotNull
    @JsonProperty("password")
    private String password;

//    @JsonProperty("name")
//    private String name;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy="user")
    @Fetch(FetchMode.SUBSELECT)
    List<Playdate> playdateList;


    public User() {}

    private User(Builder builder) {
        this.username = builder.username;
        this.password = builder.password;
    }

    public String getUsername() {
        return username;
    }

    public User setUsername(String username) {
        this.username = username;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public User setPassword(String password) {
        this.password = password;
        return this;
    }

    @JsonIgnore
    private boolean enabled;

    public boolean isEnabled() {
        return enabled;
    }

    public User setEnabled(boolean enabled) {
        this.enabled = enabled;
        return this;
    }
//
//    public String getName() {
//        return name;
//    }

//    public User setName(String name) {
//        this.name = name;
//        return this;
//    }

    public static class Builder {
//        @JsonProperty("phoneNumber")
//        private String phoneNumber;


        @JsonProperty("username")
        private String username;

        @JsonProperty("password")
        private String password;

        @JsonProperty("enabled")
        private boolean enabled;

        public Builder() {
        }

        public Builder setUsername(String username) {
            this.username = username;
            return this;
        }

        public Builder setEnabled(boolean enabled) {
            this.enabled = enabled;
            return this;
        }

//        public Builder setName(String name) {
//            this.name = name;
//            return this;
//        }

        public Builder setPassword(String password) {
            this.password = password;
            return this;
        }


        public User build() {
            return new User(this);
        }
    }
}
