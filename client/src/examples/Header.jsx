import React, { useState } from "react";
import {
    usePlayer,
    useRound,
    useGame,
  } from "@empirica/core/player/classic/react";
import { Header } from "../components/Header";
import { HelpModal } from "../components/HelpContent";

export function HeaderWithTimer() {
    const player = usePlayer();
    const game = useGame();
    const round = useRound();

    const [help, setHelp] = useState(false)

    let roundNum = `Round ${round.get("currentRound") ? round.get("currentRound") + 1 : 1}`;
    if (game.get("treatment").showNRounds) {
        roundNum += ` of ${game.get("treatment").numRounds}`;
    }

    return (
        <div className="h-full w-full">
            <Header
                left={roundNum}
                showPiggyBank
                piggyBankAmount={player.get("cumulativePayoff")}
                right="Help"
                rightOnClick={() => setHelp(true)}
            />
            {help && (
                 <HelpModal done={() => setHelp(false)} 
                 punishmentExists={game.get("treatment").punishmentExists} 
                 rewardExists={game.get("treatment").rewardExists}
                 punishmentCost={game.get("treatment").punishmentCost}
                 punishmentMagnitude={game.get("treatment").punishmentMagnitude}
                 rewardCost={game.get("treatment").rewardCost}
                 rewardMagnitude={game.get("treatment").rewardMagnitude}/>
            )}
        </div>
    )
}