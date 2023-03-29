import { ClassicListenersCollector } from "@empirica/core/admin/classic";
export const Empirica = new ClassicListenersCollector();

Empirica.onGameStart(({ game }) => {
  
  const round = game.addRound({
    name: "Instructions",
    task: "instructions"
  });

  round.addStage({ name: "First", duration: 300 });
  round.addStage({ name: "Second", duration: 300 });
  round.addStage({ name: "Third", duration: 300 });

  const round1 = game.addRound({
    name: "Round 1 - Jelly Beans",
    task: "jellybeans",
  });
  round1.addStage({ name: "Answer", duration: 300 });
  round1.addStage({ name: "Result", duration: 120 });

  const round2 = game.addRound({
    name: "Round 2 - Minesweeper",
    task: "minesweeper",
  });
  round2.addStage({ name: "Play", duration: 300 });

  console.log('start', game)
});

Empirica.onRoundStart(({ round }) => { console.log('round start', round) });

Empirica.onStageStart(({ stage }) => { console.log('stage start', stage) });

Empirica.onStageEnded(({ stage }) => {
  calculateJellyBeansScore(stage);
});

Empirica.onRoundEnded(({ round }) => {});

Empirica.onGameEnded(({ game }) => {});

// Note: this is not the actual number of beans in the pile, it's a guess...
const jellyBeansCount = 634;

function calculateJellyBeansScore(stage) {
  if (
    stage.get("name") !== "Answer" ||
    stage.round.get("task") !== "jellybeans"
  ) {
    return;
  }

  for (const player of stage.currentGame.players) {
    let roundScore = 0;

    const playerGuess = player.round.get("guess");

    if (playerGuess) {
      const deviation = Math.abs(playerGuess - jellyBeansCount);
      const score = Math.round((1 - deviation / jellyBeansCount) * 10);
      roundScore = Math.max(0, score);
    }

    player.round.set("score", roundScore);

    const totalScore = player.get("score") || 0;
    player.set("score", totalScore + roundScore);
  }
}
