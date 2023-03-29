import React from "react";
import { usePlayer, usePlayers, useStage } from "@empirica/core/player/classic/react";
import { InstructionsStepOne } from "../components/InstructionsStepOne";
import { InstructionsStepThree } from "../components/InstructionsStepThree";
import { InstructionsStepTwo } from "../components/InstructionsStepTwo";
import { pickRandomNum } from "../../utils";

export function Instructions() {
    const player = usePlayer();
    const players = usePlayers();
    const stage = useStage();

    const treatment = { playerCount: players.length, endowment: undefined };
    const contribution = pickRandomNum(0, treatment.endowment);

    function onNext() {
        console.log("next", player.stage)
        player.stage.set("submit", true);
    }

    switch (stage.get("name")) {
        case "First":
            return <InstructionsStepOne
                        onNext={onNext}
                        treatment={treatment}
                        player={{
                            _id: 10000,
                            avatar: "elephant",
                        }}
                    />;
        case "Second":
            return <InstructionsStepTwo
                        onNext={onNext}
                        treatment={treatment}
                        player={{
                            _id: 10000,
                            avatar: "elephant",
                            punished: {},
                        }}
                    />;
        case "Third":
            return <InstructionsStepThree
                        onNext={onNext}
                        treatment={treatment}
                        player={{
                            _id: 10000,
                            avatar: "elephant",
                            punished: {},
                            punishedBy: {},
                            rewarded: {},
                            rewardedBy: {},
                            contribution: contribution,
                        }}
                    />;
        default:
            return <div>Unknown stage</div>;
    }
}