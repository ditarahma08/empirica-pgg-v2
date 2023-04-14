import {
  usePlayer,
  usePlayers,
  useRound,
  useStage,
  useGame,
} from "@empirica/core/player/classic/react";
import { Loading } from "@empirica/core/player/react";
import React, { useEffect } from "react";
import { Instructions } from "./examples/Instructions";
import { Contribution } from "./examples/Contribution";
import { Outcome } from "./examples/Outcome";
import { Summary } from "./examples/Summary";
import "../main.css"

export function Stage() {
  const player = usePlayer();
  const players = usePlayers();
  const stage = useStage();
  const game = useGame();
  const round = useRound();

  const roundSound = new Audio("sounds/round-sound.mp3");
  const gameSound = new Audio("sounds/bell.mp3");

  useEffect(() => {
      if (game.get("justStarted")) {
          gameSound.play();
          game.set("justStarted", false);
      } else {
          roundSound.play();
      }
  }, []);

  switch (round.get("task")) {
    case "instructions":
      return <Instructions />;
    default:
      switch (stage.get("name")) {
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
}
