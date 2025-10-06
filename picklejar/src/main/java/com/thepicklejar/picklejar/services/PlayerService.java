package com.thepicklejar.picklejar.services;

import com.thepicklejar.picklejar.entities.Player;
import com.thepicklejar.picklejar.repositories.PlayerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlayerService {
    private final PlayerRepository playerRepository;

    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }

    public Optional<Player> getPlayerById(Long id) {
        return playerRepository.findById(id);
    }

    public Player savePlayer(Player player) {
        return playerRepository.save(player);
    }

    public void deletePlayer(Long id) {
        playerRepository.deleteById(id);
    }

    // Elo rating update method
    public void updateRatings(Player playerA, Player playerB, boolean playerAWon) {
    int K = 32; // Sensitivity factor
    double ratingA = playerA.getRating();
    double ratingB = playerB.getRating();

    // Expected scores
    double expectedA = 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400.0));
    double expectedB = 1 / (1 + Math.pow(10, (ratingA - ratingB) / 400.0));

    // Actual scores
    double scoreA = playerAWon ? 1 : 0;
    double scoreB = playerAWon ? 0 : 1;

    // Update ratings
    playerA.setRating((int)Math.round(ratingA + K * (scoreA - expectedA)));
    playerB.setRating((int)Math.round(ratingB + K * (scoreB - expectedB)));

    // Optionally update wins/losses
    if (playerAWon) {
        playerA.setWins(playerA.getWins() + 1);
        playerB.setLosses(playerB.getLosses() + 1);
    } else {
        playerB.setWins(playerB.getWins() + 1);
        playerA.setLosses(playerA.getLosses() + 1);
    }

    // Save updated players to the repository
    playerRepository.save(playerA);
    playerRepository.save(playerB);
}

}
