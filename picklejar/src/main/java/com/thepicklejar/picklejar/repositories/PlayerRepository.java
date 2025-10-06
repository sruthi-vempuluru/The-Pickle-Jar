package com.thepicklejar.picklejar.repositories;

import com.thepicklejar.picklejar.entities.Player;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<Player, Long> {}
