package com.qinzan.playdate.model;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "authority")
public class Authority implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    private String phoneNumber;
    private String authority;

    public Authority() {}

    public Authority(String phoneNumber, String authority) {
        this.phoneNumber = phoneNumber;
        this.authority = authority;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public Authority setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public String getAuthority() {
        return authority;
    }

    public Authority setAuthority(String authority) {
        this.authority = authority;
        return this;
    }
}

