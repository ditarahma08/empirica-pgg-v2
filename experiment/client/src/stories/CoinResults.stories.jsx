import React from "react";
import { CoinResults } from "../components/CoinResults";

export function MyCoinResults() {
  return (
    <div className="grid grid-cols-12 grid-flow-row h-full justify-center divide-x">
      <div className="flex h-full items-center  col-start-1 col-end-6">
        <CoinResults
          contributedYou={8}
          contributedOthers={87}
          contributedTotal={8 + 87}
          contributedMultiplied={(8 + 87) * 3}
          multiplier={3}
          received={12}
          playerCount={16}
        />
      </div>
      <div className="flex h-full items-center  col-start-6 col-end-11">
        <CoinResults
          contributedYou={8}
          contributedOthers={0}
          contributedTotal={8 + 0}
          contributedMultiplied={(8 + 0) * 89}
          multiplier={89}
          received={356}
          playerCount={2}
        />
      </div>
    </div>
  );
}
