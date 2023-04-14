import { ClassicListenersCollector } from "@empirica/core/admin/classic";
export const Empirica = new ClassicListenersCollector();
import reject from 'lodash/reject';
import times from 'lodash/times';
import { dev } from "../../dev.js";

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

  times(game.get("treatment").numRounds, (i) => {
    const round1 = game.addRound();

    round1.set("currentRound", i)

    round1.addStage({
      name: "contribution",
      displayName: "Contribution",
      duration: dev ? 300000 : game.get("treatment").contributionDuration,
    });

    round1.addStage({
      name: "outcome",
      displayName: game.get("treatment").punishmentExists
        ? "Outcome & Deductions"
        : "Outcome",
      duration: dev ? 300000 : game.get("treatment").outcomeDuration,
    });

    round1.addStage({
      name: "summary",
      displayName: "Summary",
      duration: dev ? 300000 : game.get("treatment").summaryDuration,
    });
  });
});

Empirica.onRoundStart(({ round }) => {
  round.set("roundStartTimestamp", Date.now());
  round.set("totalContributions", 0);
  round.set("totalReturns", 0);
  round.set("payoff", 0);

  const contributionProp = round.currentGame.get("treatment").defaultContribProp;

  round.currentGame.players.forEach((player, i) => {
    player.round.set("punishedBy", {});
    player.round.set("punished", {});
    player.round.set("rewardedBy", {});
    player.round.set("rewarded", {});
    player.round.set("contribution", parseInt(round.currentGame.get("treatment").endowment * contributionProp));
  });
});

Empirica.onStageStart(({ stage }) => {
  stage.set("stageStartTimestamp", Date.now());
});

Empirica.onStageEnded(({ stage }) => {
  stage.set("stageEndTimestamp", Date.now());

  if (stage.get("name") === "contribution") {
    computePayoff(stage.currentGame);
  } else if (stage.get("name") === "outcome") {
    computePunishmentCosts(stage.currentGame);
    computeRewards(stage.currentGame);
    computeIndividualPayoff(stage.currentGame);
  }
});

Empirica.onRoundEnded(({ round }) => {
  round.set("roundEndTimestamp", Date.now());

  round.currentGame.players.forEach((player) => {
    const prevCumulativePayoff = player.get("cumulativePayoff");
    const roundPayoff = player.round.get("roundPayoff");
    const newCumulativePayoff = Math.round(prevCumulativePayoff + roundPayoff);
    player.set("cumulativePayoff", newCumulativePayoff);
  });
});

Empirica.onGameEnded(({ game }) => {
  game.set("gameEndTimestamp", Date.now());
  computeTotalPayoff(game);
  convertPayoff(game);
});

function computePayoff(game) {
  const multiplier = game.get("treatment").multiplier;
  let newTotalContributions = 0;

  game.players.forEach((player) => {
    const contribution = player.round.get("contribution");
    newTotalContributions += parseFloat(contribution);
  });

  game.set("totalContributions", newTotalContributions);

  const multipliedReturns = Math.round(
    game.get("totalContributions") * multiplier
  );


  game.set("totalReturns", multipliedReturns);

  const totalReturns = game.get("totalReturns");
  const payoff = Math.round(totalReturns / game.players.length);

  game.set("payoff", payoff);
};

function computePunishmentCosts(game) {
  game.players.forEach((player) => {
    const punished = player.round.get("punished");
    const punishedKeys = Object.keys(punished);
    let cost = 0;
    for (const key of punishedKeys) {
      if (punished[key] != "0") {
        amount = punished[key];
        cost += parseFloat(amount) * game.get("treatment").punishmentCost;
      } else {
      }
    }
    let punishedBy = {};
    player.round.set("costs", cost);
    const otherPlayers = reject(game.players, (p) => p.id === player.id);
    otherPlayers.forEach((otherPlayer) => {
      const otherPlayerPunished = otherPlayer.round.get("punished");
      if (Object.keys(otherPlayerPunished).includes(player.id)) {
        punishedBy[otherPlayer.id] = otherPlayerPunished[player.id];
        console.log(punishedBy);
      }
    });
    player.round.set("punishedBy", punishedBy);
    punishedBy = player.round.get("punishedBy");
    let receivedPunishments = 0;
    const punishedByKeys = Object.keys(punishedBy);
    for (const key of punishedByKeys) {
      if (punishedBy[key] != "0") {
        amount = punishedBy[key];
        receivedPunishments += parseFloat(amount);
      }
    }
    const penalties =
      parseFloat(receivedPunishments) * game.get("treatment").punishmentMagnitude;
    player.round.set("penalties", penalties);
  });
};

function computeRewards(game) {
  game.players.forEach((player) => {
    const rewarded = player.round.get("rewarded");
    const rewardedKeys = Object.keys(rewarded);
    
    let cost = 0;
    for (const key of rewardedKeys) {
      if (rewarded[key] != "0") {
        amount = rewarded[key];
        cost += parseFloat(amount) * game.get("treatment").rewardCost;
      } else {
      }
    }

    let rewardedBy = {};

    player.round.set("costs", parseFloat(player.round.get("costs")) + cost);

    const otherPlayers = reject(game.players, (p) => p.id === player.id);
    otherPlayers.forEach((otherPlayer) => {
      const otherPlayerRewarded = otherPlayer.round.get("rewarded");
      if (Object.keys(otherPlayerRewarded).includes(player.id)) {
        rewardedBy[otherPlayer.id] = otherPlayerRewarded[player.id];
        console.log(rewardedBy);
      }
    });

    player.round.set("rewardedBy", rewardedBy);
    rewardedBy = player.round.get("rewardedBy");
    
    let receivedRewards = 0;
    const rewardedByKeys = Object.keys(rewardedBy);
    for (const key of rewardedByKeys) {
      if (rewardedBy[key] != "0") {
        amount = rewardedBy[key];
        receivedRewards += parseFloat(amount);
      }
    }
    const rewards =
      parseFloat(receivedRewards) * game.get("treatment").rewardMagnitude;
    player.round.set("rewards", rewards);
  });
};

function computeIndividualPayoff(game) {
  game.players.forEach((player) => {
    const payoff = game.get("payoff");
    const contribution = player.round.get("contribution");
    const remainingEndowment =
      parseFloat(game.get("treatment").endowment) - parseFloat(contribution);
    player.round.set("remainingEndowment", remainingEndowment);
    const penalties = player.round.get("penalties");
    const rewards = player.round.get("rewards");
    const costs = player.round.get("costs");
    const roundPayoff =
      parseFloat(payoff) +
      parseFloat(rewards) +
      parseFloat(remainingEndowment) -
      parseFloat(penalties) -
      parseFloat(costs);
    player.round.set("roundPayoff", roundPayoff);
  });
};

function computeTotalPayoff(game) {
  let totalPayoff = 0;
  game.players.forEach((player) => {
    const cumulativePayoff = player.get("cumulativePayoff");
    totalPayoff += parseFloat(cumulativePayoff);
    game.set("totalPayoff", totalPayoff);
  });
}

function convertPayoff(game) {
  game.players.forEach((player) => {
    const cumulativePayoff = player.get("cumulativePayoff");
    let earnings = 0;
    if (cumulativePayoff > 0) {
      let earnings =
        parseFloat(cumulativePayoff) * game.get("treatment").conversionRate;
    } else {
    }
    player.set("earnings", earnings);
  });
}