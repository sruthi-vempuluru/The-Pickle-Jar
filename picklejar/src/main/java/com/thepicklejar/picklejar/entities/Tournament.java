package com.thepicklejar.picklejar.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Tournament {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type; // e.g., "single elimination", "double elimination"
    private boolean seeded; // true/false

    @OneToMany(mappedBy = "tournament", cascade = CascadeType.ALL)
    private List<Player> participants;

    @OneToMany(mappedBy = "tournament", cascade = CascadeType.ALL)
    private List<Match> matches;
}
