import React from "react";
import { AddCoins, AddCoinsArrows, AddCoinsPurse } from "../components/AddCoins";

export function AddingCoins() {
  return (
    <div className="grid grid-cols-3 grid-flow-row h-full justify-center">
      <AddingCoinsTester purse={20} multiplier={3} />
      <AddingCoinsTester
        purse={2500}
        multiplier={32}
        goDown
        remainderMode={false}
      />
      <AddingCoinsTester
        purse={123}
        multiplier={1}
        allOrNothing
        allOrNothingAmount={123}
        addLabels={false}
        useArrows
      />
      <AddingCoinsTester
        purse={1}
        multiplier={1}
        allOrNothing
        allOrNothingAmount={1}
        useArrows
      />
      <AddingCoinsTester
        purse={20}
        multiplier={1}
        allOrNothing
        allOrNothingAmount={20}
      />
      <AddingCoinsTester purse={10} multiplier={1} submitted />
    </div>
  );
}

class AddingCoinsTester extends React.Component {
  state = { contributed: 0 };
  render() {
    const {
      purse,
      multiplier,
      submitted,
      allOrNothing,
      allOrNothingAmount,
      remainderMode = true,
      goDown = false,
      addLabels = true,
      useArrows = false,
    } = this.props;
    return (
      <div className="h-screen flex justify-center">
        <AddCoins
          remainderMode={remainderMode}
          useArrows={useArrows}
          goDown={goDown}
          addLabels={addLabels}
          allOrNothingAmount={allOrNothingAmount}
          allOrNothing={allOrNothing}
          header={`You can contribute up to ${purse} coins this round`}
          footer={`The pot will be multiplied by ${multiplier}× and divided equally among the group at the end of the round`}
          submittedText="You have submitted your contribution. Waiting on the other players"
          submitted={submitted}
          purse={purse}
          multiplier={multiplier}
          contributed={this.state.contributed}
          onClick={(amount) =>
            this.setState({ contributed: this.state.contributed + amount })
          }
        />
      </div>
    );
  }
}

export function Elements() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="px-16 w-1/3">
        <AddCoins
          header="You can contribute up to 20 coins this round"
          footer="The pot will be multiplied by x3 and divided equally among the group at the end of the round"
          submittedText="You have submitted your contribution. Waiting on the other players"
          purse={20}
          multiplier={3}
          contributed={5}
          onClick={(amount) => console.log(`Added ${amount}`)}
        />
      </div>
      <div className="px-16 w-1/3">
        <AddCoins
          header="You can contribute up to 20 coins this round"
          footer="The pot will be multiplied by x3 and divided equally among the group at the end of the round"
          submittedText="You have submitted your contribution. Waiting on the other players"
          submitted
          purse={20}
          multiplier={3}
          contributed={5}
          onClick={(amount) => console.log(`Added ${amount}`)}
        />
      </div>
      <AddCoinsPurse amount={0} />
      <AddCoinsPurse amount={12} />
      <AddCoinsPurse amount={125} />
      <AddCoinsPurse amount={7890} />
      <AddCoinsPurse amount={111} />
      <AddCoinsArrows
        onClick={(amount) => console.log(`Added ${amount}`)}
        canAdd1
        canAddMultiple
        canRemove1
        canRemoveMultiple
      />
      <AddCoinsArrows
        onClick={(amount) => console.log(`Added ${amount}`)}
        canAdd1
        canRemove1
      />
      <AddCoinsArrows
        onClick={(amount) => console.log(`Added ${amount}`)}
        canAddMultiple
        canRemoveMultiple
      />
    </div>
  );
}
