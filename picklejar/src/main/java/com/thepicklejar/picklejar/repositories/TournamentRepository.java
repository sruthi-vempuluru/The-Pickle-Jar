package com.thepicklejar.picklejar.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.thepicklejar.picklejar.entities.Tournament;

public interface TournamentRepository extends JpaRepository<Tournament, Long> {
}
