import React from "react";
import { Arrow, Coin } from "../assets/Assets";
import { Bowl } from "./Bowl";
import { Button } from "./FunButton";
import { Label } from "./Label";

export function AddCoins({
  header,
  submittedText,
  footer,
  purse,
  contributed,
  multiplier,
  onClick,
  goDown = false,
  addLabels = true,
  useArrows = false,
  remainderMode = true,
  remainderDisplay10 = true,
  allOrNothing = false,
  allOrNothingAmount = 0,
  onSubmit = () => console.log("I'm done"),
  submitted = false,
}) {
  const headerComp = !submitted && (
    <div className="pt-8">
      <Label color="orange" size="md" snug>
        {header}
      </Label>
    </div>
  );

  const purseComp = !submitted && (
    <AddCoinsPurse
      amount={purse - contributed}
      footer={addLabels ? "Your pocket" : ""}
    />
  );

  const arrows =
    !submitted &&
    (allOrNothing ? (
      <AddCoinsAllOrNothingArrows
        amount={allOrNothingAmount}
        canAdd={purse - contributed > 0}
        canRemove={contributed > 0}
        onClick={onClick}
        goDown={goDown}
        useArrows={useArrows}
      />
    ) : remainderMode ? (
      <AddCoinsArrows
        goDown={goDown}
        useArrows={useArrows}
        canAdd1={purse - contributed > 0}
        canAddMultiple={purse - contributed > 0}
        addMultipleAmount={purse - contributed < 10 ? purse - contributed : 10}
        displayAddMultipleAmount={
          purse - contributed < 10 && !remainderDisplay10
            ? purse - contributed
            : 10
        }
        canRemove1={contributed > 0}
        canRemoveMultiple={contributed > 0}
        removeMultipleAmount={contributed >= 10 ? 10 : contributed}
        displayRemoveMultipleAmount={
          purse - contributed < 10 && !remainderDisplay10
            ? purse - contributed
            : 10
        }
        onClick={onClick}
      />
    ) : (
      <AddCoinsArrows
        goDown={goDown}
        useArrows={useArrows}
        canAdd1={purse - contributed > 0}
        canAddMultiple={purse - contributed > 9}
        canRemove1={contributed > 0}
        canRemoveMultiple={contributed > 9}
        onClick={onClick}
      />
    ));

  const bowl = (
    <div className="xl:w-44 2xl:w-52 pt-8">
      <Bowl
        money={contributed}
        multiplier={multiplier}
        footer={addLabels ? "Pot" : ""}
      />
    </div>
  );

  const button = !submitted && (
    <div className="mt-8 w-full">
      <Button onClick={onSubmit}>I'm done</Button>
    </div>
  );

  const submittedComp = submitted && (
    <div className="pt-8">
      <Label color="gray" size="md" snug>
        {submittedText}
      </Label>
    </div>
  );

  const footerComp = !submitted && (
    <div className="pt-8">
      <Label color="orange" size="md" snug>
        {footer}
      </Label>
    </div>
  );

  let chilren = [];
  if (goDown) {
    chilren = [
      headerComp,
      purseComp,
      arrows,
      bowl,
      button,
      submittedComp,
      footerComp,
    ];
  } else {
    chilren = [
      headerComp,
      footerComp,
      bowl,
      arrows,
      purseComp,
      button,
      submittedComp,
    ];
  }

  return (
    <div className="flex flex-col items-center text-center max-w-sm">
      {chilren}
    </div>
  );
}

export function AddCoinsPurse({ amount, footer = "" }) {
  const content = (
    <div className="flex h-16 items-center">
      <div className="w-24 relative top-5">
        <Coin />
      </div>
      <Label color="yellow" size="2xl" stroke>
        {amount}
      </Label>
    </div>
  );

  return footer ? (
    <div className="flex h-24 flex-col overflow-hidden items-center">
      {content}
      <Label color="orange" size="md">
        {footer}
      </Label>
    </div>
  ) : (
    content
  );
}

export function AddCoinsArrows({
  goDown = false,
  useArrows = false,
  canAdd1 = false,
  canAddMultiple = false,
  addMultipleAmount = 10,
  displayAddMultipleAmount = 10,
  canRemove1 = false,
  canRemoveMultiple = false,
  removeMultipleAmount = 10,
  displayRemoveMultipleAmount = 10,
  onClick,
}) {
  return (
    <div className="h-24 2xl:h-48 flex items-center space-x-4">
      <AddButton
        amount={displayRemoveMultipleAmount}
        disabled={!canRemoveMultiple}
        onClick={() => onClick(-removeMultipleAmount)}
        dark
        down={!goDown}
        useArrows={useArrows}
      />
      <AddButton
        amount={1}
        disabled={!canRemove1}
        onClick={() => onClick(-1)}
        down={!goDown}
        useArrows={useArrows}
      />
      <div className="w-4 relative flex justify-center pointer-events-none">
        <div
          className={`absolute -top-16 2xl:-top-24 w-32 2xl:w-44 shrink-0 ${
            goDown ? "rotate-180" : ""
          }`}
        >
          <Arrow></Arrow>
        </div>
      </div>
      <AddButton
        amount={1}
        disabled={!canAdd1}
        onClick={() => onClick(1)}
        down={goDown}
        useArrows={useArrows}
      />
      <AddButton
        amount={displayAddMultipleAmount}
        disabled={!canAddMultiple}
        onClick={() => onClick(addMultipleAmount)}
        down={goDown}
        dark
        useArrows={useArrows}
      />
    </div>
  );
}

export function AddCoinsAllOrNothingArrows({
  goDown = false,
  useArrows = false,
  amount,
  canAdd,
  canRemove,
  onClick,
}) {
  return (
    <div className="h-24 2xl:h-48 flex items-center space-x-4">
      <AddButton
        amount={amount}
        disabled={!canRemove}
        onClick={() => onClick(-amount)}
        down={!goDown}
        dark
        freeWidth
        useArrows={useArrows}
      />
      <div className="w-4 relative flex justify-center pointer-events-none">
        <div
          className={`absolute -top-16 2xl:-top-20 w-32 2xl:w-44 shrink-0 ${
            goDown ? "rotate-180" : ""
          }`}
        >
          <Arrow></Arrow>
        </div>
      </div>
      <AddButton
        amount={amount}
        disabled={!canAdd}
        onClick={() => onClick(amount)}
        down={goDown}
        dark
        freeWidth
        useArrows={useArrows}
      />
    </div>
  );
}

function AddButton({
  amount,
  down = false,
  dark = false,
  freeWidth = false,
  useArrows = false,
  disabled,
  onClick,
}) {
  let className =
    "h-14 relative flex items-center justify-center rounded-md outline outline-4 shadow-none";

  if (!freeWidth) {
    className += " w-16";
  } else {
    className += " px-4 space-x-2";
  }

  if (!disabled) {
    className = `${className} hover:-top-0.5 hover:shadow-[0_8px_0px_0px_rgba(0,0,0,.25)] active:top-0.5 active:shadow-none`;
  }

  if (dark) {
    if (disabled) {
      className = `${className} bg-gray-200 outline-gray-300`;
    } else {
      className = `${className} bg-yellow-600 outline-orange-700`;
    }
  } else {
    if (disabled) {
      className = `${className} bg-gray-200/70 outline-gray-300/70`;
    } else {
      className = `${className} bg-yellow-500 outline-orange-600`;
    }
  }

  let arrowClass = "w-8 h-8 shrink-0";
  if (down) {
    arrowClass = `${arrowClass} transform rotate-180`;
  }

  if (!freeWidth) {
    arrowClass += " -ml-2";
  } else {
    arrowClass += " -ml-4";
  }

  let amountFinal = amount;
  if (!useArrows) {
    if (down) {
      amountFinal = "-" + amount;
    } else {
      amountFinal = "+" + amount;
    }
  }

  console.log(amountFinal);

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {useArrows ? (
        <div className={arrowClass}>
          <Arrow color="white" full />
        </div>
      ) : (
        ""
      )}
      <div className="flex justify-center shrink-0 whitespace-nowrap">
        <Label color="white" size="lg" tight>
          {amountFinal}
        </Label>
      </div>
    </button>
  );
}
