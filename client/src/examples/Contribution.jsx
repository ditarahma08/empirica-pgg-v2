import {
    usePlayer,
    usePlayers,
    useStage,
    useRound,
    useGame
  } from "@empirica/core/player/classic/react";
import React, { useEffect } from "react";
import { AddCoins } from "../components/AddCoins";
import { Avatar } from "../components/AnimalAvatar";
import { Label } from "../components/Label";
import { PlayerGrid } from "../components/PlayerGrid";
import { You } from "../components/You";
import { HeaderWithTimer } from "./Header";
  
export function Contribution() {
    const player = usePlayer();
    const players = usePlayers();
    const stage = useStage();
    const round = useRound();
    const game = useGame();

    const endowment = game.get("treatment").endowment;
    const multiplier = game.get("treatment").multiplier;
    const showNetworkInfo = game.get("treatment").networkInfoDisabled;
    const network = game.get("treatment").networkMatrix;
    const avatarId = player.get("avatarId");
    const contribution = player.round.get("contribution") || 0;
    const otherPlayers = players.filter((p) => p?.id !== player?.id);
    const connection = otherPlayers.filter((p) => network[avatarId][p.get("avatarId")] == 1);

    function handleOnClick(amount) {
        player.round.set("contribution", contribution + amount);
    };

    function handleOnSubmit(amount) {
        player.stage.set("submit", true);
    };

    return (
        <div className="h-full grid grid-rows-[min-content_1fr]">
            <HeaderWithTimer player={player} game={game} round={round} stage={stage} />
            <div className="h-full grid grid-cols-12 grid-flow-row justify-center">
                <div className="h-full relative col-start-1 col-end-4">
                    <div className="h-full relative flex items-center justify-center pb-48">
                    <You
                        submitted={player.stage.get("submit")}
                        animal={player.get("avatar")}
                        />
                    </div>
                </div>

                <div className="h-full flex items-center justify-center col-start-4 col-end-9">
                <AddCoins
                    header={`You can contribute ${
                    game.get("treatment").allOrNothing ? "" : "up to"
                    } ${endowment} coins this round`}
                    footer={`The pot will be multiplied by x${multiplier} and divided equally among the group at the end of the round`}
                    submittedText="You have submitted your contribution. Waiting on the other players"
                    purse={endowment}
                    multiplier={multiplier}
                    contributed={contribution}
                    submitted={player.stage.get("submit")}
                    allOrNothing={game.get("treatment").allOrNothing}
                    allOrNothingAmount={endowment}
                    onClick={(amount) => handleOnClick(amount)}
                    onSubmit={(amount) => handleOnSubmit(amount)}
                />
                </div>

                <div className="h-full grid grid-rows-1 col-start-9 col-end-13">
                    <PlayerGrid>
                    {!showNetworkInfo && otherPlayers.map((p, i) => (
                        <div
                            key={i}
                            className="flex justify-center items-center"
                        >
                            <div dir="ltr" className="w-16">
                            <Avatar
                                animal={p.get("avatar")}
                                submitted={p.stage.get("submit")}
                            />
                            </div>
                        </div>
                    ))}

                    {showNetworkInfo && connection.map((p, i) => (
                        <div
                            key={i}
                            className="flex justify-center items-center"
                        >
                            <div dir="ltr" className="w-16">
                            <Avatar
                                animal={p.get("avatar")}
                                submitted={p.stage.get("submit")}
                            />
                            </div>
                        </div>
                    ))}
                    </PlayerGrid>

                    <div className="px-4  pb-16 text-center">
                        <Label color="gray">
                            The other players can also contribute their coins to the pot right now
                        </Label>
                    </div>
                </div>
            </div>
        </div>
);
}
  