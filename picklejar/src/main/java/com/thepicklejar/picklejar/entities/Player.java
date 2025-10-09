package com.thepicklejar.picklejar.entities;

import jakarta.persistence.*;
import lombok.Data;

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
}
