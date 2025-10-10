package com.thepicklejar.picklejar.services;

import com.thepicklejar.picklejar.entities.Match;
import com.thepicklejar.picklejar.entities.Tournament;
import com.thepicklejar.picklejar.repositories.TournamentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TournamentService {

    private final BracketGeneratorService bracketGeneratorService;
    private final TournamentRepository tournamentRepository;

    // Preview bracket without saving
    public Tournament previewBracket(Tournament tournament) {
        List<Match> matches = bracketGeneratorService.generate(
                tournament.getType(),
                tournament.getParticipants(),
                tournament.isSeeded()
        );

        tournament.setMatches(matches);
        return tournament;
    }

    // Save tournament and matches
    public Tournament finalizeTournament(Tournament tournament) {
        return tournamentRepository.save(tournament);
    }
}
