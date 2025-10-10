package com.thepicklejar.picklejar.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "player_a_id")
    private Player playerA;

    @ManyToOne
    @JoinColumn(name = "player_b_id")
    private Player playerB;

    private int round;

    @ManyToOne
    @JoinColumn(name = "tournament_id")
    private Tournament tournament;
}
