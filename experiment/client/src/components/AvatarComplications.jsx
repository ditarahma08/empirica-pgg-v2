import React from "react";
import { Add, Deduct } from "../assets/Assets";
import { Avatar } from "./AnimalAvatar";
import { Label } from "./Label";

function prependSign(value, sign) {
  return parseInt(value) > 0 ? `${sign}${value}` : value;
}

export function AvatarScores({
  animal,
  gains,
  punishmentExists = true,
  punishmentsGiven = "",
  punishmentsReceived = "",
  rewardExists = true,
  rewardsGiven = "",
  rewardsReceived = "",
  contributed = "",
  hints = false,
  submitted = false,
}) {
  let gainsColor = "gray";
  let gainsColorBorder = "border-gray-600";
  if (gains > 0) {
    gainsColor = "green";
    gainsColorBorder = "border-green-600";
  } else if (gains < 0) {
    gainsColor = "red";
    gainsColorBorder = "border-red-600";
  }

  const avatar = (
    <div className="w-42 flex items-center justify-baseline space-x-2">
      <div className="pt-5 pb-8 px-5 relative">
        <div className="w-16">
          <Avatar submitted={submitted} animal={animal} />
        </div>
        {punishmentExists && (
          <>
            <div className="absolute top-2 right-full -mr-3.5 text-right">
              <Label color="purple" size="md" stroke shadow>
                {prependSign(punishmentsGiven, "-")}
              </Label>
            </div>
            <div className="absolute bottom-2 right-full -mr-3.5 text-right">
              <Label color="purple" size="md" stroke shadow>
                {prependSign(punishmentsReceived, "-")}
              </Label>
            </div>
          </>
        )}
        {rewardExists && (
          <>
            <div className="absolute top-2 left-full -ml-[1rem]">
              <Label color="gold" size="md" stroke shadow>
                {prependSign(rewardsGiven, "-")}
              </Label>
            </div>
            <div className="absolute bottom-2 left-full -ml-[1rem]">
              <Label color="gold" size="md" stroke shadow>
                {prependSign(rewardsReceived, "+")}
              </Label>
            </div>
          </>
        )}
        <div className="absolute -top-4 left-0 w-full text-center">
          <Label color="yellow" size="md" stroke shadow>
            {prependSign(contributed, "-")}
          </Label>
        </div>
        <div className="absolute -bottom-6 left-0 w-full text-center">
          <Label color={gainsColor} size="lg" stroke shadow>
            <div>{gains}</div>
          </Label>
        </div>
      </div>
    </div>
  );

  if (!hints) {
    return avatar;
  }

  return (
    <div className="pt-20 pb-20 px-24 relative">
      {punishmentExists && (
        <div>
          <div className="absolute w-36 text-right top-22 -mt-1/2 -left-20 pr-4">
            <div className="font-['Inter'] mb-2">
              <Label tight color="purple" size="xs">
                Coins spent on deductions
              </Label>
            </div>
            <Label color="purple" size="xs">
              Deductions
            </Label>
            <div className="font-['Inter'] mt-2">
              <Label tight color="purple" size="xs">
                Coins deducted by other players
              </Label>
            </div>
            <div className="absolute right-0 top-0 h-full w-0 border border-purple-600"></div>
          </div>
        </div>
      )}
      {rewardExists && (
        <div>
          <div className="absolute w-36 text-left top-22 -mt-1/2 -right-20 pl-4">
            <div className="font-['Inter'] mb-2">
              <Label tight color="gold" size="xs">
                Coins spent on rewards
              </Label>
            </div>
            <Label color="gold" size="xs">
              Rewards
            </Label>
            <div className="font-['Inter'] mt-2">
              <Label tight color="gold" size="xs">
                Coins rewarded by other players
              </Label>
            </div>
            <div className="absolute left-0 top-0 h-full w-0 border border-yellow-500"></div>
          </div>
        </div>
      )}
      <div className="absolute w-32 -top-6 ml-20 left-0 text-center">
        <div className="absolute left-1/2 top-0 mt-14 ml-0.5 h-6 w-0 border border-orange-600"></div>
        <Label color="orange" size="xs">
          Coins Contributed
        </Label>
      </div>

      <div className="absolute w-32 -bottom-6 ml-20 left-0 text-center">
        <Label color={gainsColor} size="xs">
          Total round Gains/Losses
        </Label>
        <div
          className={`absolute left-1/2 bottom-0 mb-14 ml-0.5 h-6 w-0 border ${gainsColorBorder}`}
        ></div>
      </div>
      {avatar}
    </div>
  );
}

export function AvatarDeduction({
  animal,
  contributed = "",
  deducted = 0,
  added = 0,
  punishmentExists = false,
  rewardExists = false,
  disabled = false,
  submitted = false,
  onAdd = () => {},
  onDeduct = () => {},
}) {
  const avatar = (
    <div className="w-42">
      <div className="pt-5 pb-8 px-5 relative">
        <div className="w-16">
          <Avatar
            disabled={
              (punishmentExists && deducted > 0) || (rewardExists && added > 0)
            }
            submitted={submitted}
            animal={animal}
          />
        </div>
        {((punishmentExists && deducted > 0) ||
          (rewardExists && added > 0)) && (
          <div className="absolute top-0 left-0 pb-2 w-full h-full flex justify-center items-center text-center">
            <Label color={deducted > 0 ? "purple" : "yellow"} size="2xl" shadow>
              {deducted > 0 ? `-${deducted}` : added}
            </Label>
          </div>
        )}
        {(rewardExists || (punishmentExists && deducted > 0)) && !disabled && (
          <button
            onClick={onAdd}
            className="absolute w-6 top-0 left-full -ml-6 hover:-top-0.5 active:top-0.5 active:shadow-none"
            title={deducted > 0 ? "Reduce punishment" : "Reward"}
          >
            <Add />
          </button>
        )}
        {(punishmentExists || (rewardExists && added > 0)) && !disabled && (
          <button
            onClick={onDeduct}
            className="absolute w-6 top-0 right-full -mr-6 text-right hover:-top-0.5 active:top-0.5 active:shadow-none"
            title={added > 0 ? "Reduce reward" : "Punish"}
          >
            <Deduct />
          </button>
        )}
        <div className="absolute -bottom-1 left-0 w-full text-center">
          <Label color="yellow" size="md" stroke shadow>
            {contributed}
          </Label>
        </div>
      </div>
    </div>
  );

  return avatar;
}
