import {
  usePlayer,
  usePlayers,
  useRound,
  useGame,
} from "@empirica/core/player/classic/react";
import { Loading } from "@empirica/core/player/react";
import React from "react";
import { Instructions } from "./examples/Instructions";
import { Contribution } from "./examples/Contribution";
import { Outcome } from "./examples/Outcome";
import { Summary } from "./examples/Summary";

export function Stage() {
  const player = usePlayer();
  const players = usePlayers();
  const round = useRound();
  const game = useGame();

  if (player.stage.get("submit")) {
    if (players.length === 1) {
      return <Loading />;
    }

    return (
      <div className="text-center text-gray-400 pointer-events-none">
        Please wait for other player(s).
      </div>
    );
  }

  switch (round.get("task")) {
    case "instructions":
      return <Instructions />;
    case "contribution":
      return <Contribution />;
    case "minesweeper":
      return <Outcome />;
    case "summary":
      return <Summary />;
    default:
      return <div>Unknown task</div>;
  }
}
