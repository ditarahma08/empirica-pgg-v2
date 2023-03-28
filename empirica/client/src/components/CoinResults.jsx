import React from "react";
import { ArrowNumber } from "./Arrow";
import { Bowl } from "./Bowl";
import { Highlighter } from "./Highlighter";
import { Label } from "./Label";

export const CoinResults = ({
  contributedYou,
  contributedOthers,
  contributedTotal,
  contributedMultiplied,
  received,
  multiplier,
  playerCount,
  highlight = null,
}) => {
  return (
    <div className="relative w-full">
      <div className="relative w-full">
        <div className="flex flex-col -space-y-12">
          <Highlighter name="contributions" highlight={highlight}>
            <div className="flex w-full justify-center items-center">
              <div className="w-52">
                <Bowl money={contributedTotal} />
              </div>
            </div>

            <div className="h-44 absolute top-0 left-0">
              <ArrowNumber
                direction="E"
                showNumber
                number={contributedYou}
                color="yellow"
              />
            </div>
            <div className="h-44 absolute top-0 right-0">
              <ArrowNumber
                direction="W"
                showNumber
                number={contributedOthers}
                text={`Avg. ${Math.round(
                  contributedOthers / (playerCount - 1)
                )} each`}
                color="yellow"
              />
            </div>
          </Highlighter>
        </div>

        <Highlighter name="outcome" highlight={highlight}>
          <div>
            <div className="h-32">
              <ArrowNumber
                direction="S"
                showNumber
                number={multiplier}
                multiply
                color="pink"
                full
                dim
                small
              />
            </div>

            <div className="h-44 mt-4 flex flex-col items-center">
              <Label color="green" size="4xl" shadow stroke tight>
                {contributedMultiplied}
              </Label>
              <Label color="green" size="md" shadow stroke tight>
                / {playerCount} Players
              </Label>
            </div>

            <div className="h-44 absolute bottom-28 left-4">
              <ArrowNumber
                direction="NW"
                showNumber
                number={Math.round(received)}
                color="green"
                dim
              />
            </div>
            <div className="h-44 absolute bottom-28 right-4">
              <ArrowNumber
                direction="NE"
                text={playerCount > 2 ? "each" : ""}
                showNumber
                number={Math.round(received)}
                color="green"
                dim
                // double
              />
            </div>
          </div>
        </Highlighter>
      </div>
    </div>
  );
};
