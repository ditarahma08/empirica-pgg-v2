import React from "react";
import { AvatarDeduction, AvatarScores } from "../components/AvatarComplications";

export function AvatarWithScore() {
  return (
    <div className="flex flex-col justify-center items-center space-y-24">
      <div className="grid grid-flow-row grid-cols-3 gap-12">
        <AvatarScores animal={"sloth"} gains={8} />
        <AvatarScores animal={"elephant"} gains={0} />
        <AvatarScores animal={"moose"} gains={-32} />

        <AvatarScores
          animal={"crocodile"}
          punishmentsGiven="20"
          punishmentsReceived="118"
          rewardsGiven="741"
          rewardsReceived="11"
          contributed="0"
          gains={8}
        />
        <AvatarScores
          animal={"snake"}
          punishmentsGiven="5"
          punishmentsReceived="20"
          rewardsGiven="0"
          rewardsReceived="1"
          contributed="0"
          gains={0}
        />
        <AvatarScores
          animal={"moose"}
          punishmentsGiven="0"
          punishmentsReceived="78"
          rewardsGiven="42"
          rewardsReceived="42"
          contributed="245"
          gains={-320}
        />

        <AvatarScores submitted animal={"sloth"} gains={8} />
        <AvatarScores submitted animal={"elephant"} gains={0} />
        <AvatarScores submitted animal={"moose"} gains={-32} />

        <AvatarScores
          submitted
          animal={"crocodile"}
          punishmentsGiven="20"
          punishmentsReceived="118"
          rewardsGiven="741"
          rewardsReceived="11"
          contributed="0"
          gains={8}
        />
        <AvatarScores
          submitted
          animal={"snake"}
          punishmentsGiven="5"
          punishmentsReceived="20"
          rewardsGiven="0"
          rewardsReceived="1"
          contributed="0"
          gains={0}
        />
        <AvatarScores
          submitted
          animal={"moose"}
          punishmentsGiven="0"
          punishmentsReceived="78"
          rewardsGiven="420"
          rewardsReceived="742"
          contributed="245"
          gains={-320}
        />
      </div>

      <div className="border">
        <AvatarScores
          hints
          animal={"parrot"}
          punishmentsGiven="0"
          punishmentsReceived="78"
          rewardsGiven="0"
          rewardsReceived="11"
          contributed="0"
          gains={-320}
        />
      </div>

      <AvatarScores
        hints
        animal={"parrot"}
        punishmentsGiven="480"
        punishmentsReceived="780"
        rewardsGiven="480"
        rewardsReceived="780"
        contributed="2450"
        gains={420}
        submitted
      />

      <AvatarScores
        hints
        animal={"parrot"}
        punishmentsGiven="1"
        punishmentsReceived="1"
        rewardsGiven="1"
        rewardsReceived="1"
        contributed="11"
        gains={-111}
        submitted
      />
    </div>
  );
}

export function AvatarWithDeduction() {
  return (
    <div className="flex flex-col justify-center items-center space-y-24">
      <div className="grid grid-flow-row grid-cols-3 gap-8">
        <AvatarDeduction animal={"bear"} contributed="8" />
        <AvatarDeduction animal={"zebra"} contributed="0" />
        <AvatarDeduction animal={"rabbit"} contributed="-32" />

        <AvatarDeduction submitted animal={"bear"} contributed="8" />
        <AvatarDeduction submitted animal={"zebra"} contributed="0" />
        <AvatarDeduction submitted animal={"rabbit"} contributed="-32" />

        {/* Reward exists */}

        <AvatarDeduction
          animal={"walrus"}
          contributed="20"
          rewardExists
          added={0}
        />
        <AvatarDeduction
          animal={"whale"}
          contributed="5"
          rewardExists
          added={8}
        />
        <AvatarDeduction
          animal={"moose"}
          contributed="0"
          rewardExists
          added={240}
        />

        {/* Punishment exists */}

        <AvatarDeduction
          submitted
          animal={"walrus"}
          contributed="20"
          punishmentExists
          deducted={0}
        />
        <AvatarDeduction
          submitted
          animal={"whale"}
          contributed="5"
          punishmentExists
          added={8}
        />
        <AvatarDeduction
          submitted
          animal={"moose"}
          contributed="0"
          punishmentExists
          deducted={240}
        />

        {/* Reward and Punishment exists - ONLY ADDED */}

        <AvatarDeduction
          submitted
          animal={"walrus"}
          contributed="20"
          punishmentExists
          rewardExists
          added={0}
        />
        <AvatarDeduction
          submitted
          animal={"whale"}
          contributed="5"
          punishmentExists
          rewardExists
          added={8}
        />
        <AvatarDeduction
          submitted
          animal={"moose"}
          contributed="0"
          punishmentExists
          rewardExists
          added={240}
        />

        {/* Reward and Punishment exists - ONLY DEDUCTED */}

        <AvatarDeduction
          submitted
          animal={"walrus"}
          contributed="20"
          punishmentExists
          rewardExists
          deducted={0}
        />
        <AvatarDeduction
          submitted
          animal={"whale"}
          contributed="5"
          punishmentExists
          rewardExists
          deducted={8}
        />
        <AvatarDeduction
          submitted
          animal={"moose"}
          contributed="0"
          punishmentExists
          rewardExists
          deducted={240}
        />
      </div>
    </div>
  );
}
