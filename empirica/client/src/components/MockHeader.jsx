import React from "react";
import { Header } from "./Header";
import { HelpModal } from "./HelpContent";

export class MockHeader extends React.Component {
  state = { num: 300, help: false };

  componentDidMount() {
    const { paused } = this.props;
    if (paused) {
      return;
    }

    this.startTimer();
  }

  startTimer() {
    // Disabling timer in intro. To reenable, remove return.
    return;

    this.interval = setInterval(() => {
      let num = this.state.num - 1;
      if (num < 0) {
        num = 120;
      }

      this.setState((state) => ({ num }));
    }, 1000);
  }

  componentDidUpdate(prevProps) {
    const { paused } = this.props;
    if (paused && !prevProps.paused) {
      clearInterval(this.interval);
    } else if (!paused && prevProps.paused) {
      this.startTimer();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { endowment, showNRounds, numRounds, punishmentExists, rewardExists, punishmentCost, punishmentMagnitude, rewardCost, rewardMagnitude} = this.props;
    const { num } = this.state;
    var min = Math.floor(num / 60);
    var sec = num % 60;

    let roundNum = `Round 1`;

    if (showNRounds) {
      roundNum += ` of ${numRounds}`;
    }

    return (
      <div className="w-full pgg-header">
        <Header
          left={roundNum}
          showPiggyBank
          piggyBankAmount={endowment}
          timerMinutes={`${min < 10 ? "0" : ""}${min}`}
          timerSeconds={`${sec < 10 ? "0" : ""}${sec}`}
          right="Help"
          rightOnClick={() => this.setState({ help: true })}
        />
        {this.state.help ? (
          <HelpModal 
          done={() => this.setState({ help: false })}
          punishmentExists = {punishmentExists}
          rewardExists = {rewardExists} 
          punishmentCost={punishmentCost}
          punishmentMagnitude={punishmentMagnitude}
          rewardCost={rewardCost}
          rewardMagnitude={rewardMagnitude}
          />
        ) : null}
      </div>
    );
  }
}
