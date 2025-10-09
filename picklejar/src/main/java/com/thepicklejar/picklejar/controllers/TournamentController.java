package com.thepicklejar.picklejar.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

import com.thepicklejar.picklejar.services.TournamentService;
import com.thepicklejar.picklejar.entities.Tournament;

@RestController
@RequestMapping("/api/tournaments")
public class TournamentController {

    private final TournamentService tournamentService;

    public TournamentController(TournamentService tournamentService) {
        this.tournamentService = tournamentService;
    }

    // Preview the bracket
    @PostMapping("/preview")
    public ResponseEntity<Tournament> previewTournament(@RequestBody Tournament tournament) {
        Tournament preview = tournamentService.previewBracket(tournament);
        return ResponseEntity.ok(preview);
    }

    // Finalize (save) the tournament
    @PostMapping("/finalize")
    public ResponseEntity<Tournament> finalizeTournament(@RequestBody Tournament tournament) {
        Tournament saved = tournamentService.finalizeTournament(tournament);
        return ResponseEntity.ok(saved);
    }

    // ✅ Create a new tournament
    @PostMapping("/create")
    public ResponseEntity<Tournament> createTournament(@RequestBody Tournament tournament) {
        Tournament created = tournamentService.finalizeTournament(tournament);
        return ResponseEntity.ok(created);
    }
}
