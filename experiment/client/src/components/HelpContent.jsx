import React from "react";

import { createPortal } from "react-dom";


export function HelpModal({ done, punishmentExists, rewardExists, punishmentCost, punishmentMagnitude, rewardCost, rewardMagnitude}) {
  return createPortal(
    <HelpContent 
      done={done} 
      punishmentExists={punishmentExists} 
      rewardExists={rewardExists} 
      punishmentCost={punishmentCost}
      punishmentMagnitude={punishmentMagnitude}
      rewardCost={rewardCost}
      rewardMagnitude={rewardMagnitude}
    />,
    document.querySelector("#modal-root")
  );
}

export function HelpContent({ done, punishmentExists, rewardExists, punishmentCost, punishmentMagnitude, rewardCost, rewardMagnitude}) {
  return (
    <div
      className="z-50 h-screen w-screen fixed top-0 left-0 bg-white/70 p-20 flex justify-center"
      onClick={done}
    >
      <div className="relative bg-white rounded-lg shadow-lg border-8 border-orange-200 p-12 h-auto max-w-prose overflow-auto">
        <button
          onClick={done}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-300 text-white text-2xl flex justify-center items-center leading-none"
        >
          &times;
        </button>

        <div className="prose prose-slate prose-p:text-gray-500 prose-p:font-['Inter'] prose-headings:text-orange-600">
          <h1>Stages of the game</h1>
          Each round of the game has three stages:
          <ul>
            <li>
              <strong>Contribution:</strong> Each player decides how much of
              their grant money (20 coins each round) to contribute to the
              public fund. The public fund is then multiplied and divided
              equally among players.
            </li>
            <li>
              <strong>Outcome:</strong> The contributions and payoffs of each
              player are revealed.
            </li>
            <li>
              <strong>Summary:</strong> A summary of the round is presented,
              where you can mouse over an avatar to see details of that player's
              outcome.
            </li>
          </ul>
          <h1>Calculating payoffs from contributions:</h1>
          <p>
            The amount each player receives from the public fund contributions
            is calculated as: 
            <img src="/experiment/images/fund_payoff.jpg"/>
          </p>

          {(rewardExists & !(rewardExists & punishmentExists)) ? <h1>Rewarding other players:</h1>:""}
          {(punishmentExists & !(rewardExists & punishmentExists)) ? <h1>Deducting from other players:</h1>:""}
          {(rewardExists & punishmentExists) ? <h1>Rewarding/Deducting from other players:</h1>:""}

          {punishmentExists? <p>
            To deduct from other players during the outcome stage, you must pay {punishmentCost} coins per deduction,
            and each deduction will take away {punishmentMagnitude} coins from the targeted player.
          </p>:""}

          {rewardExists? <p>
            To reward other players during the outcome stage, you must pay {rewardCost} coins per reward,
            and each reward will give {rewardMagnitude} coins to the targeted player.
          </p>:""}

          {(rewardExists | punishmentExists) ? <p>The associated costs are deducted from your cumulative earnings (the money in your piggy bank).</p>:""}

          <h1>Calculating your total payoff for a single round:</h1>
          <p>
            The total coins you gain for the round are calculated as:
            {(!rewardExists & !punishmentExists) ? <img src="/experiment/images/round_payoff_none.jpg"/>:""}
            {(rewardExists & !(rewardExists & punishmentExists)) ? <img src="/experiment/images/round_payoff_r.jpg"/>:""}
            {(punishmentExists & !(rewardExists & punishmentExists)) ? <img src="/experiment/images/round_payoff_p.jpg"/>:""}
            {(rewardExists & punishmentExists) ? <img src="/experiment/images/round_payoff_rp.jpg"/>:""}
          </p>
          <p>
            Your payoff for a single round is then added to the total coins in
            your piggy bank.
          </p>
        </div>
      </div>
    </div>
  );
}
