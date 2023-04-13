import React, { useState } from "react";
import { usePlayer, usePlayers, useGame, useRound, useStage } from "@empirica/core/player/classic/react";
import { AvatarScores } from "../components/AvatarComplications";
import { Button } from "../components/FunButton";
import { DeductionDetails } from "../components/DeductionDetails";
import { Label } from "../components/Label";
import { PlayerGrid } from "../components/PlayerGrid";
import { HeaderWithTimer } from "./Header";

export function Summary() {
    const player = usePlayer();
    const players = usePlayers();
    const game = useGame();
    const round = useRound();
    const stage = useStage();

    const [hovered, setHovered] = useState(null);
    const [self, setSelf] = useState(null);

    const {
        showOtherSummaries,
        punishmentExists,
        punishmentCost,
        punishmentMagnitude,
        rewardExists,
        rewardCost,
        rewardMagnitude,
        showPunishmentId,
        showRewardId,
    } = game.get("treatment");

    const otherPlayers = players.filter((p) => p.id !== player.id);
    const punished = player.round.get("punished");
    const punishedBy = player.round.get("punishedBy");
    const rewarded = player.round.get("rewarded");
    const rewardedBy = player.round.get("rewardedBy");
    const contribution = player.round.get("contribution");
    const roundPayoff = player.round.get("roundPayoff");

    function handleSubmit() {
        player.stage.set("submit", true);
    };

    function handleOnMouseEnter() {
        setSelf(player.id);
    };

    function handleOnMouseLeave() {
        setSelf(null);
    };

    function handleOnOtherMouseEnter(id) {
        setHovered(id);
    };

    function handleOnOtherMouseLeave() {
        setHovered(null);
    }

    return (
        <div className="h-full grid grid-rows-[min-content_1fr]">
            <HeaderWithTimer player={player} game={game} round={round} stage={stage} />

            <div className="h-full grid grid-cols-[500px_1fr] grid-flow-row justify-center">
                <div className="h-full relative">
                    <div className="h-full relative flex flex-col items-center justify-center pb-48">
                        <div onMouseEnter={() => handleOnMouseEnter()} onMouseLeave={() => handleOnMouseLeave()}>
                            <AvatarScores
                                hints
                                submitted={player.stage.get("submit")}
                                animal={player.get("avatar")}
                                punishmentExists={punishmentExists}
                                punishmentsGiven={(
                                    Object.values(punished).reduce((a, b) => a + b, 0) *
                                    punishmentCost
                                ).toString()}
                                punishmentsReceived={(
                                    Object.values(punishedBy).reduce((a, b) => a + b, 0) *
                                    punishmentMagnitude
                                ).toString()}
                                rewardExists={rewardExists}
                                rewardsGiven={(
                                    Object.values(rewarded).reduce((a, b) => a + b, 0) *
                                    rewardCost
                                ).toString()}
                                rewardsReceived={(
                                    Object.values(rewardedBy).reduce((a, b) => a + b, 0) *
                                    rewardMagnitude
                                ).toString()}
                                contributed={contribution}
                                gains={roundPayoff}
                            />
                        </div>

                        <div className="w-full px-24 pt-20">
                            {player.stage.get("submit") ? (
                            <Label color="gray">
                                You have submitted. Waiting on the other players
                            </Label>
                            ) : (
                            <Button onClick={() => handleSubmit()}>
                                I'm done
                            </Button>
                            )}
                        </div>
                    </div>

                    {self === null && hovered !== null && showOtherSummaries ? (
                        <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center pb-48 bg-white/70">
                            <Details
                                punishmentExists={punishmentExists}
                                rewardExists={rewardExists}
                                selectedPlayerID={hovered}
                                players={players}
                                punishmentCost={punishmentCost}
                                punishmentMagnitude={punishmentMagnitude}
                                rewardCost={rewardCost}
                                rewardMagnitude={rewardMagnitude}
                                isSelf={false}
                                showPunishmentId={showPunishmentId}
                                showRewardId={showRewardId}
                            />
                        </div>
                    ) : (
                        ""
                    )}
                </div>

                <div className="h-full relative pl-16">
                    <div className="p-2 text-center rounded bg-pink-100 text-pink-600">
                    Payoff received by all players from the pool: {round.get("payoff")} coins
                    </div>

                    <PlayerGrid>
                        {otherPlayers.map((otherPlayer, i) => {
                            const punished = otherPlayer.round.get("punished");
                            const punishedBy = otherPlayer.round.get("punishedBy");
                            const contribution = otherPlayer.round.get("contribution");
                            const roundPayoff = otherPlayer.round.get("roundPayoff");
                            const rewarded = otherPlayer.round.get("rewarded");
                            const rewardedBy = otherPlayer.round.get("rewardedBy");

                            return (
                                <div
                                    dir="ltr"
                                    key={otherPlayer.id}
                                    className="w-full h-full flex justify-center items-center"
                                    onMouseEnter={() => handleOnOtherMouseEnter(otherPlayer.id)}
                                    onMouseLeave={() => handleOnOtherMouseLeave()}
                                >
                                    <AvatarScores
                                        submitted={otherPlayer.stage.get("submit")}
                                        animal={otherPlayer.get("avatar")}
                                        punishmentExists={punishmentExists}
                                        punishmentsGiven={(showOtherSummaries
                                            ? Object.values(punished).reduce((a, b) => a + b, 0) *
                                            punishmentCost
                                            : ""
                                        ).toString()}
                                        punishmentsReceived={(showOtherSummaries
                                            ? Object.values(punishedBy).reduce((a, b) => a + b, 0) *
                                            punishmentMagnitude
                                            : ""
                                        ).toString()}
                                        rewardExists={rewardExists}
                                        rewardsGiven={(showOtherSummaries
                                            ? Object.values(rewarded).reduce((a, b) => a + b, 0) *
                                            rewardCost
                                            : ""
                                        ).toString()}
                                        rewardsReceived={(showOtherSummaries
                                            ? Object.values(rewardedBy).reduce((a, b) => a + b, 0) *
                                            rewardMagnitude
                                            : ""
                                        ).toString()}
                                        contributed={showOtherSummaries ? contribution : null}
                                        gains={showOtherSummaries ? roundPayoff : null}
                                    />
                                </div>
                            );
                        })}
                    </PlayerGrid>

                    {self !== null && hovered === null ? (
                        <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center pb-48 bg-white/70">
                            <Details
                                punishmentExists={punishmentExists}
                                rewardExists={rewardExists}
                                selectedPlayerID={self}
                                players={game.players}
                                punishmentCost={punishmentCost}
                                punishmentMagnitude={punishmentMagnitude}
                                rewardCost={rewardCost}
                                rewardMagnitude={rewardMagnitude}
                                isSelf={true}
                                showPunishmentId={showPunishmentId}
                                showRewardId={showRewardId}
                            />
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
}

function Details({
    punishmentExists,
    rewardExists,
    selectedPlayerID,
    players,
    punishmentCost,
    punishmentMagnitude,
    rewardCost,
    rewardMagnitude,
    isSelf,
    showPunishmentId,
    showRewardId,
}) {
    const player = usePlayer();
    const punished = player.round.get("punished");
    const punishedBy = player.round.get("punishedBy");
    const rewarded = player.round.get("rewarded");
    const rewardedBy = player.round.get("rewardedBy");
    const contribution = player.round.get("contribution");
    const roundPayoff = player.round.get("roundPayoff");

    const deductionsSpent = [];
    for (const playerID in punished) {
        const amount = punished[playerID] * punishmentCost || 0;
        if (amount === 0) continue;
        const otherPlayer = players.find((p) => p.id === playerID);
        deductionsSpent.push({ animal: otherPlayer.get("avatar"), amount });
    }

    const deductionsReceived = [];
    for (const playerID in punishedBy) {
        const amount = punishedBy[playerID] * punishmentMagnitude || 0;
        if (amount === 0) continue;
        const otherPlayer = players.find((p) => p.id === playerID);
        deductionsReceived.push({ animal: otherPlayer.get("avatar"), amount });
    }

    const rewardsSpent = [];
    for (const playerID in rewarded) {
        const amount = rewarded[playerID] * rewardCost || 0;
        if (amount === 0) continue;
        const otherPlayer = players.find((p) => p.id === playerID);
        rewardsSpent.push({ animal: otherPlayer.get("avatar"), amount });
    }

    const rewardsReceived = [];
    for (const playerID in rewardedBy) {
        const amount = rewardedBy[playerID] * rewardMagnitude || 0;
        if (amount === 0) continue;
        const otherPlayer = players.find((p) => p.id === playerID);
        rewardsReceived.push({ animal: otherPlayer.get("avatar"), amount });
    }

    return (
        <DeductionDetails
          animal={player.get("avatar")}
          submitted={player.stage.get("submit")}
          contributed={contribution}
          gains={roundPayoff}
          punishmentExists={punishmentExists}
          deductionsSpent={deductionsSpent}
          deductionsReceived={deductionsReceived}
          rewardExists={rewardExists}
          rewardsSpent={rewardsSpent}
          rewardsReceived={rewardsReceived}
          isSelf={isSelf}
          showPunishmentId={showPunishmentId}
          showRewardId={showRewardId}
        />
    );
}
