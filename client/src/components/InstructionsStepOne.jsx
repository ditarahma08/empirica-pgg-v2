import React from "react";
import { AnimalList } from "../assets/AnimalsAvatar";
import { Button } from "./NormalButton";
import { pickRandom } from "../../utils";
import { Input } from "./Input";
import { MockContribution } from "./MockContribution";

export class InstructionsStepOne extends React.Component {
  state = { current: 0, messages: [] };

  constructor(props) {
    super(props);

    const { playerCount, defaultContribProp, endowment} = props.treatment;
    const playerAvatar = props.player.avatar;
    const exclude = [playerAvatar];

    const otherPlayers = [];
    for (let i = 0; i < playerCount - 1; i++) {
      const avatar = pickRandom(AnimalList, exclude);
      exclude.push(avatar);
      otherPlayers.push({ id: i, avatar, submitted: false });
    }

    this.state = { ...this.state, otherPlayers };

    this.steps = [
      {
        modal: "pre",
      },
      {
        component: "header",
        content: (
          <div className="prose">
            <p>
              This is the navigation bar. Here, you can see which round of the
              game you are currently in, the coins you have earned so far, and
              the time remaining for the current stage. To review information
              about the game, click "Help".
            </p>
          </div>
        ),
        position: "bottom",
        nextText: "Ok",
      },
      {
        component: "center",
        content: (
          <div className="prose">
            <p>
              In the contribution stage, use the arrow buttons to decide how
              many of the coins you are given in each round you want to
              contribute to the public fund (the bowl); the default contribution is {parseInt(defaultContribProp*endowment)} coins. Try using the buttons to change your contribution.
            </p>
            <p>
              When you have decided how many coins to contribute, be sure to
              submit your decision by clicking the "I'm done" button. Go ahead
              and click "I'm done" when you're ready for the next step.
            </p>
          </div>
        ),
        nonext: true,
      },
      {
        component: "you",
        content: (
          <div className="prose">
            <p>
              Your information and avatar will always show up on the left side
              of the screen.
            </p>
          </div>
        ),
        nextText: "Got it",
      },
      {
        component: "players",
        content: (
          <div className="prose">
            <p>
              Other players' avatars will always show up on the right side of
              the screen.
            </p>
          </div>
        ),
      },
    ];

    if (props.treatment.chat) {
      this.steps.push({
        component: "chat",
        content: (
          <div className="prose">
            <p>
              You can use the chat window to communicate with other players.
            </p>
          </div>
        ),
        nextText: "Understood",
      });
    }

    this.steps.push({
      modal: "quizz",
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { current, chatted } = this.state;

    let step = this.steps[current];
    if (step?.component !== "chat" || chatted) {
      return;
    }

    this.setState({
      chatted: true,
    });

    this.timeout = setTimeout(() => {
      this.setState((state) => ({
        ...state,
        chatted: true,
        messages: [
          ...state.messages,
          {
            id: state.messages.length,
            text: "Hello!",
            avatar: state.otherPlayers[0].avatar,
            playerId: state.otherPlayers[0].id,
            timestamp: Date.now(),
          },
        ],
      }));
    }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { onNext, treatment, player, paused } = this.props;
    const { current, messages, otherPlayers } = this.state;

    let step = this.steps[current];

    return (
      <div className="relative h-full">
        <MockContribution
          highlight={{
            step: step?.component ? step : null,
            next: () => this.setState({ current: this.state.current + 1 }),
            back:
              current === 0
                ? ""
                : () => this.setState({ current: current - 1 }),
          }}
          treatment={treatment}
          player={player}
          otherPlayers={otherPlayers}
          paused={paused}
          messages={messages}
          onMessage={(message) => {
            this.setState({
              messages: [...messages, message],
            });
          }}
        />
        {step?.modal ? (
          <div className="z-40 h-screen w-screen fixed top-0 left-0 bg-white/80 p-20 flex justify-center">
            <div className="relative bg-white rounded-lg shadow-lg border-8 border-orange-200 p-12 h-auto overflow-auto">
              <div className="prose max-w-none prose-slate prose-p:text-gray-500 prose-p:font-['Inter'] prose-headings:text-orange-600">
                {step.modal === "pre" ? (
                  <Intro
                    next={() =>
                      this.setState({ current: this.state.current + 1 })
                    }
                    treatment={treatment}
                  />
                ) : step.modal === "quizz" ? (
                  <Quizz
                    treatment={treatment}
                    next={() => onNext()}
                    back={
                      current === 0
                        ? ""
                        : () => this.setState({ current: current - 1 })
                    }
                  />
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
  state = { playerCount: "", coins: "", incorrect: [] };

  handleSubmit = (event) => {
    event.preventDefault();
    const incorrect = [];
    if (
      this.state.playerCount !==
      (this.props.treatment.playerCount - 1).toString()
    ) {
      incorrect.push("playerCount");
    }

    if (this.state.coins !== "6") {
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
    const { treatment, back } = this.props;
    const { playerCount, coins, incorrect } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Questions</h1>
        <p>
          In this game there will be a total of {treatment.playerCount} players.
          How many players are there other than yourself?
        </p>

        <Input
          name="playerCount"
          value={playerCount}
          handleUpdate={this.handleUpdate}
          required
          error={incorrect.includes("playerCount")}
        />

        <p>
          Imagine that in a given round, you have a starting fund of 10 coins.
          If you contribute 4 coins, how much of your starting funds do you
          keep?
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

        <p className="flex space-x-4 pt-8 pb-16">
          <Button type="button" onClick={back}>
            Back
          </Button>

          <Button fullWidth type="submit">
            Got it
          </Button>
        </p>
      </form>
    );
  }
}

function Intro({ next, treatment }) {
  return (
    <>
      <h1> How the game works </h1>
      <p>
        In this multi-player game, you will be in a group. Each person is given
        a set amount of coins at the start of each round. You will also be shown
        a money multiplier. There will be a public fund that you can choose to
        contribute to—you will not be able to see others' contributions before
        making your own. After everyone has contributed, the amount in the
        public fund will be multiplied by the money multiplier.
      </p>

      <p>
        This amount is then evenly divided among the group as the "payoff". You
        get to keep the payoff and whatever you have left of your private funds.
        The diagram below shows an example:
      </p>

      <img
        className="public-fund-img"
        src="experiment/images/explanation.png"
        width="50%"
      />

      <p>
        In this example, three players chose to contribute all 20 coins they
        were granted for the round, while one player contributed 0 coins. The
        total contribution, 60 coins, is then multiplied by a factor of 2,
        making the total size of the public fund then 120 coins, which is
        equally distributed among the four players.
      </p>

      <h1> Total coins and cash earnings </h1>

      <p>
        You will have a total balance of coins throughout the game, with each
        round's earnings being added to this amount. Try to maximize your total
        coins! When the game concludes, the coins will be converted to a cash
        bonus towards your final payment.
      </p>

      <p>
        <strong>
          You will receive a base payment of ${treatment.basePay} for your
          participation in the game, in addition to $1 per{" "}
          {treatment.conversionRate} coins earned. To receive the bonus payment,
          please be sure to stay for all rounds of the game; the exit survey
          marks the end of the game and contains the code for submission. If you
          are detected to be idle, you forfeit the bonus amount.
        </strong>
      </p>

      <p className="space-x-4 pt-8 pb-16">
        <Button fullWidth onClick={next}>
          Got it
        </Button>
      </p>
    </>
  );
}
