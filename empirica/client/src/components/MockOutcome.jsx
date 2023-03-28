import React from "react";
import { AvatarDeduction } from "./AvatarComplications";
import { CoinResults } from "./CoinResults";
import { Button } from "./FunButton";
import { Highlighter } from "./Highlighter";
import { Label } from "./Label";
import { MockChatView } from "./MockChat";
import { MockHeader } from "./MockHeader";
import { PlayerGrid } from "./PlayerGrid";
import { You } from "./You";

export class MockOutcome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      treatment,
      player,
      paused,
      highlight,
      messages,
      onMessage,
      totalContributions,
      totalReturns,
      payoff,
      otherPlayers,
    } = this.props;

    const {
      multiplier,
      endowment,
      showNRounds,
      numRounds,
      playerCount,
      punishmentMagnitude,
      punishmentCost,
      punishmentExists,
      rewardCost,
      rewardExists,
      rewardMagnitude,
      chat,
    } = treatment;

    return (
      <div className="h-full grid grid-rows-[min-content_1fr]">
        <Highlighter name="header" highlight={highlight}>
          <MockHeader
            endowment={endowment}
            paused={paused}
            showNRounds={showNRounds}
            numRounds={numRounds}
            punishmentExists={punishmentExists}
            rewardExists={rewardExists}
            punishmentCost={punishmentCost}
            punishmentMagnitude={punishmentMagnitude}
            rewardCost={rewardCost}
            rewardMagnitude={rewardMagnitude}
          />
        </Highlighter>
        <div className="h-full grid grid-cols-[280px_600px_1fr] grid-flow-row justify-center">
          <div className="h-full relative flex flex-col items-center justify-center">
            <div className="relative">
              <Highlighter name="you" pad highlight={highlight}>
                <You submitted={false} animal={player.avatar} />
              </Highlighter>

              <div className="px-4 pt-16">
                <Highlighter name="never" highlight={highlight}>
                  <div>
                    {rewardExists && (
                      <Label color="yellow" size="md">
                        Rewards: It will cost you {rewardCost} coins to give a
                        reward of {rewardMagnitude} coins.
                      </Label>
                    )}
                    {rewardExists && punishmentExists && (
                      <div className="mt-4" />
                    )}
                    {punishmentExists && (
                      <Label color="purple" size="md">
                        Deductions: It will cost you {punishmentCost} coins to
                        impose a deduction of {punishmentMagnitude} coins.
                      </Label>
                    )}
                  </div>
                </Highlighter>
              </div>
            </div>
            <MockChatView
              name="chat"
              highlight={highlight}
              showChat={chat}
              messages={messages}
              player={player}
              onMessage={onMessage}
            />
          </div>
          <div className="flex flex-col h-full items-center justify-center">
            <CoinResults
              highlight={highlight}
              contributedYou={player.contribution}
              contributedOthers={totalContributions - player.contribution}
              contributedTotal={totalContributions}
              contributedMultiplied={totalReturns}
              multiplier={multiplier}
              received={payoff}
              playerCount={playerCount}
            />
            {false ? (
              <Label color="gray">
                You have submitted your deductions. Waiting on the other players
              </Label>
            ) : (
              <div className="w-full px-32">
                <Highlighter name="submit" pad highlight={highlight}>
                  <Button onClick={() => player.stage.submit()}>
                    I'm done
                  </Button>
                </Highlighter>
              </div>
            )}
          </div>
          <div className="h-full grid grid-rows-1">
            <Highlighter name="players" highlight={highlight}>
              <PlayerGrid>
                {otherPlayers.map((otherPlayer, i) => {
                  return (
                    <div
                      key={otherPlayer._id}
                      className="flex justify-center items-center"
                    >
                      <div dir="ltr" className="w-[6.5rem]">
                        <AvatarDeduction
                          animal={otherPlayer.avatar}
                          submitted={false}
                          contributed={otherPlayer.contribution}
                          punishmentExists={punishmentExists}
                          rewardExists={rewardExists}
                          disabled={false}
                          deducted={
                            otherPlayer.punishment * punishmentMagnitude
                          }
                          added={otherPlayer.reward * rewardMagnitude}
                          onAdd={() => {
                            if (otherPlayer.punishment > 0) {
                              console.log("add p");
                              otherPlayer.punish(
                                otherPlayer._id,
                                -otherPlayer.punishment + 1
                              );
                            } else if (rewardExists) {
                              console.log(
                                "add R",
                                otherPlayer.reward,
                                rewardCost
                              );
                              if (
                                (otherPlayer.reward + 1) * rewardCost <=
                                endowment
                              ) {
                                console.log("add r");
                                otherPlayer.punish(
                                  otherPlayer._id,
                                  otherPlayer.reward + 1
                                );
                              }
                            }
                          }}
                          onDeduct={() => {
                            if (otherPlayer.reward > 0) {
                              console.log("deduct r");
                              otherPlayer.punish(
                                otherPlayer._id,
                                otherPlayer.reward - 1
                              );
                            } else if (punishmentExists) {
                              console.log("deduct p");
                              if (
                                (otherPlayer.punishment + 1) * punishmentCost <=
                                endowment
                              ) {
                                otherPlayer.punish(
                                  otherPlayer._id,
                                  -otherPlayer.punishment - 1
                                );
                              }
                            }
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </PlayerGrid>
            </Highlighter>
          </div>
        </div>
      </div>
    );
  }
}
