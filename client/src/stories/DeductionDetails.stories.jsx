import React from "react";
import { AnimalList } from "../assets/AnimalsAvatar";
import { Avatar } from "../components/AnimalAvatar";
import { DeductionDetails } from "../components/DeductionDetails";
import { PlayerGrid } from "../components/PlayerGrid";

export function MyDeductionDetails() {
  return (
    <div className="flex space-x-4">
      <DeductionDetails
        rewardExists
        showPunishmentId
        punishmentExists
        animal="sloth"
        submitted
        contributed={12}
        gains={-8}
        deductionsSpent={[
          { animal: "whale", amount: 8 },
          { animal: "parrot", amount: 2 },
        ]}
        deductionsReceived={[
          { animal: "whale", amount: 8 },
          { animal: "dog", amount: 88 },
          { animal: "moose", amount: 18 },
        ]}
        rewardsSpent={[
          { animal: "whale", amount: 8 },
          { animal: "parrot", amount: 2 },
        ]}
        rewardsReceived={[
          { animal: "whale", amount: 8 },
          { animal: "dog", amount: 88 },
          { animal: "moose", amount: 18 },
        ]}
      />
      <DeductionDetails
        rewardExists
        showPunishmentId
        punishmentExists
        animal="giraffe"
        contributed={12}
        gains={8}
        deductionsSpent={[]}
        deductionsReceived={[]}
        rewardsSpent={[]}
        rewardsReceived={[]}
      />
    </div>
  );
}

export class MyDeductionDetailsHover extends React.Component {
  state = { hovered: 1 };

  render() {
    const { hovered } = this.state;
    console.log(hovered);

    return (
      <div className="h-full w-full relative">
        {hovered !== null ? (
          <div className="absolute z-10 inset-0 pointer-events-none flex items-center bg-white/70">
            <DeductionDetails
              rewardExists
              punishmentExists
              showPunishmentId
              animal={AnimalList[hovered]}
              submitted
              contributed={12}
              gains={-8}
              deductionsSpent={[
                { animal: "whale", amount: 8 },
                { animal: "parrot", amount: 2 },
              ]}
              deductionsReceived={[
                { animal: "whale", amount: 8 },
                { animal: "dog", amount: 88 },
                { animal: "moose", amount: 18 },
              ]}
              rewardsSpent={[
                { animal: "whale", amount: 8 },
                { animal: "parrot", amount: 2 },
              ]}
              rewardsReceived={[
                { animal: "whale", amount: 8 },
                { animal: "dog", amount: 88 },
                { animal: "moose", amount: 18 },
              ]}
            />
          </div>
        ) : (
          ""
        )}

        <PlayerGrid>
          {Array.from(Array(15).keys()).map((_, i) => (
            <div
              key={AnimalList[i]}
              className="w-16 outline outline-red-500"
              onMouseEnter={() => this.setState({ hovered: i })}
              onMouseLeave={() => this.setState({ hovered: null })}
            >
              <Avatar animal={AnimalList[i]} />
            </div>
          ))}
        </PlayerGrid>
      </div>
    );
  }
}
