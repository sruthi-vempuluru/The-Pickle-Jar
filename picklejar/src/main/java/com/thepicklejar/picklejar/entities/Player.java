package com.thepicklejar.picklejar.entities;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Data
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String displayName;
    private int rating = 1000; // default
    private int wins = 0;
    private int losses = 0;

    @ManyToOne
    @JoinColumn(name = "tournament_id")
    @JsonIgnore  // <-- ADD THIS
    private Tournament tournament; // <-- needed for mappedBy in Tournament
}
