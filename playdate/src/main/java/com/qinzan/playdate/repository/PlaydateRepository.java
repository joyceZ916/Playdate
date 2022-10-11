package com.qinzan.playdate.repository;


import com.qinzan.playdate.model.Playdate;
import com.qinzan.playdate.model.User;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaydateRepository extends JpaRepository<Playdate, Long> {
    List<Playdate> findByUser(User user);
    List<Playdate> findAll(Specification<Playdate> specification);
    Playdate findByIdAndUser(Long id, User user);
}

