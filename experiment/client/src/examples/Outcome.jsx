import React from "react";
import { usePlayer, usePlayers, useRound, useStage, useGame } from "@empirica/core/player/classic/react";
import { Button } from "../components/FunButton";
import { CoinResults } from "../components/CoinResults";
import { Label } from "../components/Label";
import { PlayerGrid } from "../components/PlayerGrid";
import { You } from "../components/You";
import { HeaderWithTimer } from "./Header";
import moment from "moment";

export function Outcome() {
  const player = usePlayer();
  const players = usePlayers();
  const round = useRound();
  const stage = useStage();
  const game = useGame();

  const {
    multiplier,
    punishmentCost,
    punishmentExists,
    punishmentMagnitude,
    rewardCost,
    rewardExists,
    rewardMagnitude,
  } = game.get("treatment");

  const playerCount = players.length;
  const otherPlayers = players.filter((p) => p?.id !== player?.id);

  const totalContributions = round.get("totalContributions");
  const totalReturns = round.get("totalReturns");
  const payoff = round.get("payoff");

  const contribution = player.round.get("contribution");
  const cumulativePayoff = player.get("cumulativePayoff");
  const punishments = player.round.get("punished");
  const rewards = player.round.get("rewarded");

  let totalCost = 0;
  for (const key in punishments) {
    totalCost += parseFloat(punishments[key]) * punishmentCost;
  }

  for (const key in rewards) {
    totalCost += parseFloat(rewards[key]) * rewardCost;
  }

  function handleSubmit() {
    // game.append("log",{
    //     verb:"submit", 
    //     playerId:player._id, 
    //     roundIndex:round.index, 
    //     stage:stage.name, 
    //     timestamp:moment(Date.now())});
    player.stage.set("submit", true);
  }

  return (
    <div className="h-full grid grid-rows-[min-content_1fr]">
        <HeaderWithTimer player={player} game={game} round={round} stage={stage} />
        <div className="h-full grid grid-cols-[280px_600px_1fr] grid-flow-row justify-center">
            <div className="h-full relative flex flex-col items-center justify-center">
                <div className="relative">
                    <You
                        submitted={player.stage.submitted}
                        animal={player.get("avatar")}
                    />

                    <div className="px-4 pt-16">
                        {rewardExists && (
                            <Label color="yellow" size="md">
                                Rewards: It will cost you {rewardCost} coins to give a reward of {rewardMagnitude} coins.
                            </Label>
                        )}

                        {rewardExists && punishmentExists && <div className="mt-4" />}

                        {punishmentExists && (
                            <Label color="purple" size="md">
                                Deductions: It will cost you {punishmentCost} coins to impose a deduction of {punishmentMagnitude} coins.
                            </Label>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-col h-full items-center justify-center">
                <CoinResults
                    contributedYou={contribution}
                    contributedOthers={totalContributions - contribution}
                    contributedTotal={totalContributions}
                    contributedMultiplied={totalReturns}
                    multiplier={multiplier}
                    received={payoff}
                    playerCount={playerCount}
                />

                {player.stage.submitted ? (
                    <Label color="gray">
                    Waiting on the other players...
                    </Label>
                ) : (
                    <div className="w-full px-32">
                        <Button onClick={() => handleSubmit()}>I'm done</Button>
                    </div>
                )}
            </div>

            <div className="h-full grid grid-rows-1">
                <PlayerGrid>
                    {otherPlayers.map((otherPlayer, i) => {
                        const punished = punishments[otherPlayer._id] || 0;
                        const added = rewards[otherPlayer._id] || 0;

                        const punish = (increase) => {
                            if (increase) {
                                if (totalCost + punishmentCost > cumulativePayoff) {
                                    alert( "You don't have enough coins to make this deduction!");
                                    return;
                                }

                                punishments[otherPlayer._id] = punished + 1;
                    
                                // game.append("log",{
                                //     verb:"addPunishment", 
                                //     playerId:player._id, 
                                //     targetPlayerId:otherPlayer._id, 
                                //     roundIndex:round.index, 
                                //     stage:stage.name, 
                                //     timestamp:moment(Date.now());
                    
                            } else {
                                punishments[otherPlayer._id] = punished - 1;

                                // game.append("log",{
                                //     verb:"removePunishment", 
                                //     playerId:player._id, 
                                //     targetPlayerId:otherPlayer._id, 
                                //     roundIndex:round.index, 
                                //     stage:stage.name, 
                                //     timestamp:moment(Date.now())});
                            }
                            player.round.set("punished", punishments);
                        };


                        const reward = (increase) => {
                            if (increase) {
                            if (totalCost + rewardCost > cumulativePayoff) {
                                alert("You don't have enough coins to make this reward!");

                                return;
                            }
                            rewards[otherPlayer._id] = added + 1;

                            // game.append("log",{
                            //     verb:"addReward", 
                            //     playerId:player._id, 
                            //     targetPlayerId:otherPlayer._id, 
                            //     roundIndex:round.index, 
                            //     stage:stage.name, 
                            //     timestamp:moment(TimeSync.serverTime(null, 1000))});
                            
                            } else {
                            rewards[otherPlayer._id] = added - 1;

                            // game.append("log",{
                            //     verb:"removeReward", 
                            //     playerId:player._id, 
                            //     targetPlayerId:otherPlayer._id, 
                            //     roundIndex:round.index, 
                            //     stage:stage.name, 
                            //     timestamp:moment(TimeSync.serverTime(null, 1000))});
                            }

                            player.round.set("rewarded", rewards);
                        };

                        const add = () => {
                            if (punished > 0) {
                            punish(false);
                            } else {
                            reward(true);
                            }
                        };

                        const deduct = () => {
                            if (added > 0) {
                            reward(false);
                            } else {
                            punish(true);
                            }
                        };

                        return (
                            <div
                            key={player._id}
                            className="flex justify-center items-center"
                            >
                            <div dir="ltr" className="w-[6.5rem]">
                                <AvatarDeduction
                                animal={otherPlayer.get("avatar")}
                                submitted={otherPlayer.stage.submitted}
                                contributed={otherPlayer.round.get("contribution")}
                                disabled={player.stage.submitted}
                                punishmentExists={punishmentExists}
                                deducted={punished * punishmentMagnitude}
                                rewardExists={rewardExists}
                                added={added * rewardMagnitude}
                                onDeduct={deduct}
                                onAdd={add}
                                />
                            </div>
                            </div>
                        );
                    })}
                </PlayerGrid>
            </div>
        </div>
    </div>
  );
}
