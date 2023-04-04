import {
    usePlayer,
    useStage,
    useRound,
    useGame,
  } from "@empirica/core/player/classic/react";
  import React, { useEffect } from "react";
  import { Button } from "../components/Button";
  import { Timer } from "../components/Timer";
  import { HeaderWithTimer } from "./Header";
  
  export function Contribution() {
    const player = usePlayer();
    const stage = useStage();
    const round = useRound();
    const game = useGame();

    const roundSound = new Audio("sounds/round-sound.mp3");
    const gameSound = new Audio("sounds/bell.mp3");
  
    function handleSubmit() {
      player.stage.set("submit", true);
    }

    useEffect(() => {
        if (game.get("justStarted")) {
            gameSound.play();
            game.set("justStarted", false);
        } else {
            roundSound.play();
        }
    }, [])
  
    return (
        <div className="h-full grid grid-rows-[min-content_1fr]">
            <HeaderWithTimer player={player} game={game} round={round} stage={stage} />
            <Button handleClick={handleSubmit} primary>
                Submit
            </Button>
        </div>
    );
  }
  