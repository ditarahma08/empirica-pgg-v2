import {
  usePlayer,
  usePlayers,
  useRound,
  useStage,
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
  const stage = useStage();
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

  switch (stage.get("name")) {
    case "instructions":
      return <Instructions />;
    case "contribution":
      return <Contribution />;
    case "outcome":
      return <Outcome />;
    case "summary":
      return <Summary />;
    default:
      return <div>Unknown task</div>;
  }
}
