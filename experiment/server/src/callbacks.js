import { ClassicListenersCollector } from "@empirica/core/admin/classic";
export const Empirica = new ClassicListenersCollector();

export const AnimalList = [
  "sloth",
  "gorilla",
  "duck",
  "chicken",
  "dog",
  "parrot",
  "moose",
  "rabbit",
  "owl",
  "chick",
  "snake",
  "crocodile",
  "cow",
  "pinguin",
  "monkey",
  "frog",
  "elephant",
  "whale",
  "horse",
  "walrus",
  "rhino",
  "giraffe",
  "pig",
  "buffalo",
  "zebra",
  "narwhal",
  "bear",
  "goat",
  "hippo",
  "panda",
];

Empirica.onGameStart(({ game }) => {
  game.set("justStarted", true);
  game.set("gameStartTimestamp", Date.now());

  game.players.forEach((player, i) => {
    player.set("avatar", AnimalList[i]);
    player.set("avatarId", i);
    player.set("cumulativePayoff", game.get("treatment").endowment);
  });

  const round = game.addRound({
    name: "Instructions",
    task: "instructions"
  });

  round.addStage({ name: "First", duration: 300 });
  round.addStage({ name: "Second", duration: 300 });
  round.addStage({ name: "Third", duration: 300 });

  const round1 = game.addRound({
    name: "Round 1 - Contribution",
    task: "contribution",
  })

  round1.addStage({ name: "Answer", duration: 1000 });
  round1.addStage({ name: "Result", duration: 120 });

  const round2 = game.addRound({
    name: "Round 2 - Outcome",
    task: "outcome",
  });
  round2.addStage({ name: "Play", duration: 300 });

  const round3 = game.addRound({
    name: "Summary",
    task: "summary",
  });
  round3.addStage({ name: "Summary", duration: 1000 });

});

Empirica.onRoundStart(({ round }) => {
  round.set("roundStartTimestamp", Date.now());
  round.set("totalContributions", 0);
  round.set("totalReturns", 0);
  round.set("payoff", 0);

  const contributionProp = round.currentGame.get("treatment").defaultContribProp;

  console.log('round start', round.currentGame.players, round.currentGame.get("treatment"))

  round.currentGame.players.forEach((player, i) => {
    player.round.set("punishedBy", {});
    player.round.set("punished", {});
    player.round.set("rewardedBy", {});
    player.round.set("rewarded", {});
    player.round.set("contribution", parseInt(round.currentGame.get("treatment").endowment * contributionProp));
  });
});

Empirica.onStageStart(({ stage }) => { });

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
