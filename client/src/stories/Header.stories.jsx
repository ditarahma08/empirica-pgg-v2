import React from "react";
import { Header } from "../components/Header";

export class NormalHeader extends React.Component {
  state = { num: 12 };

  componentDidMount() {
    this.interval = setInterval(() => {
      let num = this.state.num - 1;
      if (num < 0) {
        num = 59;
      }

      this.setState((state) => ({ num }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="w-full ">
        <Header
          left="Round 1"
          showPiggyBank
          piggyBankAmount={20}
          timerMinutes="00"
          timerSeconds={`${this.state.num}`}
          right="Help"
          rightOnClick={() => alert("click")}
        />
      </div>
    );
  }
}

export const MinimalHeader = () => {
  return (
    <div className="w-full outline-slate-200 outline">
      <Header left="" right="" rightOnClick={() => alert("click")} />
    </div>
  );
};
