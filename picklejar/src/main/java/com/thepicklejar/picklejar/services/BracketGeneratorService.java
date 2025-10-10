package com.thepicklejar.picklejar.services;

import com.thepicklejar.picklejar.entities.Match;
import com.thepicklejar.picklejar.entities.Player;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BracketGeneratorService {

    public List<Match> generate(String type, List<Player> participants, boolean seeded) {
        if ("DOUBLE_ELIMINATION".equalsIgnoreCase(type)) {
            return generateDoubleElimination(participants);
        } else if ("ROUND_ROBIN".equalsIgnoreCase(type)) {
            return generateRoundRobin(participants);
        }
        return new ArrayList<>();
    }

    private List<Match> generateDoubleElimination(List<Player> participants) {
        List<Match> matches = new ArrayList<>();
        // Example: pair players sequentially
        for (int i = 0; i < participants.size() - 1; i += 2) {
            Match match = new Match();
            match.setPlayerA(participants.get(i));
            match.setPlayerB(participants.get(i + 1));
            match.setRound(1);
            matches.add(match);
        }
        return matches;
    }

    private List<Match> generateRoundRobin(List<Player> participants) {
        List<Match> matches = new ArrayList<>();
        int round = 1;
        for (int i = 0; i < participants.size(); i++) {
            for (int j = i + 1; j < participants.size(); j++) {
                Match match = new Match();
                match.setPlayerA(participants.get(i));
                match.setPlayerB(participants.get(j));
                match.setRound(round);
                matches.add(match);
            }
            round++;
        }
        return matches;
    }
}
