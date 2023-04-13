import React from "react";
import { AnimalList } from "../assets/AnimalsAvatar";
import { Button } from "./NormalButton";
import { pickRandom, pickRandomNum } from "../../utils";
import { Input } from "./Input";
import { MockSummary } from "./MockSummary";

function distribute(length, value) {
  if (length <= 1) return [value];
  const half = Math.floor(length / 2);
  const dist = Math.floor(Math.random() * value);

  return distribute(half, dist).concat(distribute(length - half, value - dist));
}

function genRP(player, players, budget) {
  const given = {};
  const budgets = distribute(players.length - 1, budget);

  for (const player2 of players) {
    if (player2 === player) {
      continue;
    }

    given[player2.id] = budgets.pop();
  }

  return given;
}

function applyContributions(player, treatment) {
  const { endowment } = treatment;

  player.contribution = pickRandomNum(0, endowment);
}

function applyValues(player, allPlayers, treatment, roundPayoff) {
  const { punishmentExists, punishmentCost, rewardExists, rewardCost } =
    treatment;

  player.roundGross = roundPayoff - player.contribution;

  player.punished = {};
  player.punishedBy = {};
  player.rewarded = {};
  player.rewardedBy = {};

  player.roundNet = player.roundGross;

  if (player.roundGross <= 0) {
    return;
  }

  // 80% chance of applying rewards or punishments
  if (Math.random() > 0.8) {
    return;
  }

  // The budget is a random percentage of roundGross
  const budget = Math.floor(player.roundGross * Math.random());

  if (budget === 0) {
    return;
  }

  // Split budget between rewards and punishments
  const rewardBudget = Math.floor(budget * Math.random());
  const punishmentBudget = budget - rewardBudget;

  if (punishmentExists && punishmentBudget > 0) {
    player.punished = genRP(player, allPlayers, punishmentBudget);
  }

  if (rewardExists && rewardBudget > 0) {
    player.rewarded = genRP(player, allPlayers, rewardBudget);
  }

  player.roundNet -= punishmentBudget * punishmentCost;
  player.roundNet -= rewardBudget * rewardCost;
}

function applyRPReceived(player, allPlayers, treatment) {
  player.punishedBy = {};
  player.rewardedBy = {};

  const { punishmentMagnitude, rewardMagnitude } = treatment;

  for (const player2 of allPlayers) {
    if (player2 === player) {
      continue;
    }

    const { punished, rewarded } = player2;

    if (punished[player.id]) {
      player.punishedBy[player2.id] = punished[player.id];
    }

    if (rewarded[player.id]) {
      player.rewardedBy[player2.id] = rewarded[player.id];
    }
  }

  for (const [id, amount] of Object.entries(player.punishedBy)) {
    player.roundNet -= amount * punishmentMagnitude;
  }

  for (const [id, amount] of Object.entries(player.rewardedBy)) {
    player.roundNet += amount * rewardMagnitude;
  }
}

export class InstructionsStepThree extends React.Component {
  state = { current: 0, messages: [] };

  constructor(props) {
    super(props);

    const { treatment, player } = props;
    const { playerCount, multiplier, punishmentExists, rewardExists } =
      treatment;
    const exclude = [player.avatar];

    const otherPlayers = [];
    for (let i = 0; i < playerCount - 1; i++) {
      const avatar = pickRandom(AnimalList, exclude);
      exclude.push(avatar);

      otherPlayers.push({
        id: i,
        avatar,
        submitted: false,
      });
    }

    const currentPlayer = { ...props.player };

    const allPlayers = [currentPlayer, ...otherPlayers];

    let roundContributions = 0;
    for (const player of allPlayers) {
      applyContributions(player, props.treatment);
      roundContributions += player.contribution;
    }

    const roundPayoff = Math.floor(
      (roundContributions * multiplier) / playerCount
    );

    for (const player of allPlayers) {
      applyValues(player, allPlayers, props.treatment, roundPayoff);
    }

    for (const player of allPlayers) {
      applyRPReceived(player, allPlayers, props.treatment);
    }

    // console.log(JSON.stringify(currentPlayer, null, "  "));
    // console.log(JSON.stringify(otherPlayers, null, "  "));

    this.state = { ...this.state, currentPlayer, otherPlayers };

    this.steps = [
      {
        component: "you",
        content: (
          <div className="prose">
            <p>
              Here, you can view a summary of your outcome for the round,
              including contributions
              {punishmentExists && " and deductions (given/received)"}.
            </p>
          </div>
        ),
        nextText: "Ok",
      },
      {
        component: "players",
        content: (
          <div className="prose">
            <p>The same summary is also shown for other players.</p>
          </div>
        ),
        nextText: "Great",
      },
    ];

    this.steps.push({ modal: "quizz" });
  }

  render() {
    const { onNext, treatment, paused } = this.props;
    const { current, messages, otherPlayers, currentPlayer } = this.state;

    let step = this.steps[current];
    
    return (
      <div className="relative h-full">
        <MockSummary
          highlight={{
            step: step?.component ? step : null,
            next: () => this.setState({ current: current + 1 }),
            back:
              current === 0
                ? ""
                : () => this.setState({ current: current - 1 }),
          }}
          treatment={treatment}
          player={currentPlayer}
          otherPlayers={otherPlayers}
          paused={paused}
          messages={messages}
          onMessage={(message) => {
            this.setState({
              messages: [...messages, message],
            });
          }}
          totalContributions={10}
          totalReturns={10}
          payoff={10}
          cumulativePayoff={10}
        />
        {step?.modal ? (
          <div className="z-40 h-screen w-screen fixed top-0 left-0 bg-white/80 p-20 flex justify-center">
            <div className="relative bg-white rounded-lg shadow-lg border-8 border-orange-200 p-12 h-auto max-w-prose overflow-auto">
              <div className="prose prose-slate prose-p:text-gray-500 prose-p:font-['Inter'] prose-ul:font-['Inter'] prose-headings:text-orange-600">
                {step.modal === "quizz" ?  (
                  <Quizz treatment={treatment} next={() => onNext()} />
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

class Quizz extends React.Component {
  state = { coins: "", incorrect: [] };

  handleSubmit = (event) => {
    event.preventDefault();
    const { treatment } = this.props;
    const incorrect = [];

    if (treatment.punishmentExists) {
      var val = 2 * treatment.punishmentMagnitude;
    } else {
      var val = 2 * treatment.rewardMagnitude;
    }

    if (this.state.coins !== val.toString()) {
      incorrect.push("coins");
    }

    if (incorrect.length > 0) {
      this.setState({ incorrect });
      return;
    }

    this.props.next();
  };

  handleUpdate = (event) => {
    const { value, name } = event.currentTarget;
    this.setState({ [name]: value, incorrect: [] });
  };

  render() {
    const { treatment, next } = this.props;
    const { coins, incorrect } = this.state;
    const {
      punishmentExists,
      punishmentMagnitude,
      punishmentCost,
      rewardExists,
      rewardMagnitude,
      rewardCost,
    } = treatment;

    if (!punishmentExists && !rewardExists) {
      this.props.next();
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Questions</h1>

        <p>
          Each {punishmentExists ? "deduction" : "reward"} you put on another
          player {punishmentExists ? "deducts " : "gives "}
          {punishmentExists ? punishmentMagnitude : rewardMagnitude} coins{" "}
          {punishmentExists ? "from" : "to"} them, and costs you{" "}
          {punishmentExists ? punishmentCost : rewardCost} coins. If you spend{" "}
          {punishmentExists ? 2 * punishmentCost : 2 * rewardCost} coins to{" "}
          {punishmentExists ? "deduct from" : "reward"} another player, how many
          coins will be {punishmentExists ? "deducted from" : "given to"} them?
        </p>

        <Input
          name="coins"
          value={coins}
          handleUpdate={this.handleUpdate}
          required
          error={incorrect.includes("coins")}
        />

        {incorrect.length > 0 ? (
          <div className="text-red-500">
            Some answers were incorrect. Try again.
          </div>
        ) : null}
        <p className="space-x-4 pt-8 pb-16">
          <Button fullWidth type="submit">
            Submit
          </Button>
        </p>
      </form>
    );
  }
}
