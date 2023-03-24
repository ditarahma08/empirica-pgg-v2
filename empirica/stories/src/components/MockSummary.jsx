import React from "react";
import { AvatarScores } from "./AvatarComplications";
import { DeductionDetails } from "./DeductionDetails";
import { Button } from "./FunButton";
import { Highlighter } from "./Highlighter";
import { MockChatView } from "./MockChat";
import { MockHeader } from "./MockHeader";
import { PlayerGrid } from "./PlayerGrid";

export class MockSummary extends React.Component {
  state = { hovered: null, self: null };

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
      otherPlayers,
    } = this.props;
    const { hovered, self } = this.state;

    const {
      endowment,
      showNRounds,
      numRounds,
      punishmentExists,
      punishmentMagnitude,
      punishmentCost,
      rewardExists,
      rewardCost,
      rewardMagnitude,
      showPunishmentId,
      chat,
    } = treatment;

    const allPlayers = [player, ...otherPlayers];

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
        <div className="h-full grid grid-cols-[500px_1fr] grid-flow-row justify-center">
          <div className="h-full relative">
            <div className="h-full relative flex flex-col items-center justify-center pb-48">
              <div
                onMouseEnter={() => this.setState({ self: player._id })}
                onMouseLeave={() => this.setState({ self: null })}
              >
                <Highlighter name="you" pad={80} highlight={highlight}>
                  <AvatarScores
                    hints
                    submitted={false}
                    animal={player.avatar}
                    punishmentExists={punishmentExists}
                    punishmentsGiven={(
                      Object.values(player.punished).reduce(
                        (a, b) => a + b,
                        0
                      ) * punishmentCost
                    ).toString()}
                    punishmentsReceived={(
                      Object.values(player.punishedBy).reduce(
                        (a, b) => a + b,
                        0
                      ) * punishmentMagnitude
                    ).toString()}
                    rewardExists={rewardExists}
                    rewardsGiven={(
                      Object.values(player.rewarded).reduce(
                        (a, b) => a + b,
                        0
                      ) * rewardCost
                    ).toString()}
                    rewardsReceived={(
                      Object.values(player.rewardedBy).reduce(
                        (a, b) => a + b,
                        0
                      ) * rewardMagnitude
                    ).toString()}
                    contributed={player.contribution}
                    gains={player.roundNet}
                  />
                </Highlighter>
              </div>
              <div className="w-full px-24 pt-20">
                <Highlighter name="never" highlight={highlight}>
                  <Button onClick={() => player.stage.submit()}>
                    I'm done
                  </Button>
                </Highlighter>
              </div>
            </div>

            {false && self === null && hovered !== null ? (
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center pb-48 bg-white/70">
                <Details
                  selectedPlayerID={hovered}
                  players={allPlayers}
                  punishmentExists={punishmentExists}
                  punishmentCost={punishmentCost}
                  punishmentMagnitude={punishmentMagnitude}
                  rewardExists={rewardExists}
                  rewardCost={rewardCost}
                  rewardMagnitude={rewardMagnitude}
                  isSelf={false}
                  showPunishmentId={showPunishmentId}
                />
              </div>
            ) : (
              ""
            )}

            <MockChatView
              name="chat"
              highlight={highlight}
              showChat={chat}
              messages={messages}
              player={player}
              onMessage={onMessage}
            />
          </div>
          <div className="h-full relative pl-16">
            <Highlighter name="players" highlight={highlight}>
              <PlayerGrid>
                {otherPlayers.map((player, i) => {
                  const {
                    punished,
                    punishedBy,
                    rewarded,
                    rewardedBy,
                    contribution,
                    roundNet,
                  } = player;

                  return (
                    <div
                      dir="ltr"
                      key={player._id}
                      className="w-full h-full flex justify-center items-center"
                      onMouseEnter={() =>
                        this.setState({ hovered: player._id })
                      }
                      onMouseLeave={() => this.setState({ hovered: null })}
                    >
                      <AvatarScores
                        submitted={false}
                        animal={player.avatar}
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
                        gains={roundNet}
                      />
                    </div>
                  );
                })}
              </PlayerGrid>
            </Highlighter>

            {false && self !== null && hovered === null ? (
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center pb-48 bg-white/70">
                <Details
                  selectedPlayerID={self}
                  players={allPlayers}
                  punishmentExists={punishmentExists}
                  punishmentCost={punishmentCost}
                  punishmentMagnitude={punishmentMagnitude}
                  rewardExists={rewardExists}
                  rewardCost={rewardCost}
                  rewardMagnitude={rewardMagnitude}
                  isSelf={true}
                  showPunishmentId={showPunishmentId}
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
}

function Details({
  selectedPlayerID,
  players,
  punishmentExists,
  punishmentCost,
  punishmentMagnitude,
  rewardExists,
  rewardCost,
  rewardMagnitude,
  isSelf,
  showPunishmentId,
}) {
  const player = players.find((p) => p._id === selectedPlayerID);

  const { punished, punishedBy, rewarded, rewardedBy, contribution, roundNet } =
    player;

  const deductionsSpent = [];
  for (const playerID in punished) {
    const amount = punished[playerID] * punishmentCost || 0;
    if (amount === 0) continue;
    const otherPlayer = players.find((p) => p._id === playerID);
    deductionsSpent.push({ animal: otherPlayer.get("avatar"), amount });
  }

  const deductionsReceived = [];
  for (const playerID in punishedBy) {
    const amount = punishedBy[playerID] * punishmentMagnitude || 0;
    if (amount === 0) continue;
    const otherPlayer = players.find((p) => p._id === playerID);
    deductionsReceived.push({ animal: otherPlayer.get("avatar"), amount });
  }

  const rewardsSpent = [];
  for (const playerID in rewarded) {
    const amount = rewarded[playerID] * rewardCost || 0;
    if (amount === 0) continue;
    const otherPlayer = players.find((p) => p._id === playerID);
    rewardsSpent.push({ animal: otherPlayer.get("avatar"), amount });
  }

  const rewardsReceived = [];
  for (const playerID in rewardedBy) {
    const amount = rewardedBy[playerID] * rewardMagnitude || 0;
    if (amount === 0) continue;
    const otherPlayer = players.find((p) => p._id === playerID);
    rewardsReceived.push({ animal: otherPlayer.get("avatar"), amount });
  }

  return (
    <DeductionDetails
      animal={player.avatar}
      submitted={player.stage.submitted}
      contributed={contribution}
      gains={roundNet}
      punishmentExists={punishmentExists}
      deductionsSpent={deductionsSpent}
      deductionsReceived={deductionsReceived}
      rewardExists={rewardExists}
      rewardsSpent={rewardsSpent}
      rewardsReceived={rewardsReceived}
      isSelf={isSelf}
      showPunishmentId={showPunishmentId}
    />
  );
}
