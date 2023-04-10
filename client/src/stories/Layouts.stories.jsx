import React from "react";
import { AddCoins } from "../components/AddCoins";
import { AnimalList } from "../assets/AnimalsAvatar";
import { Avatar } from "../components/AnimalAvatar";
import { AvatarDeduction, AvatarScores } from "../components/AvatarComplications";
import { ChatExample } from "../components/Chat";
import { CoinResults } from "../components/CoinResults";
import { Button } from "../components/FunButton";
import { NormalHeader } from "./Header.stories";
import { Label } from "../components/Label";
import { PlayerGrid } from "../components/PlayerGrid";
import { You } from "../components/You";

function randID() {
  return Math.random().toString(16).slice(8);
}

let start = 30;
function ts() {
  start--;
  return new Date(Date.now() - 1000 * start);
}

const messages = [
  {
    text: "Als Kreditengagement gelten in diesem Zusammenhang alle Kreditengagements gegenüber dem privaten Sektor offenlegen, die in die fortgeschrittene CVA-Risikokapitalanforderung erfolgt durch Annahme eines konstanten EE-Profils, wobei EE gleich dem EAD gemäss CEM bzw. Vermögenswerte des Fonds, zu denen die Bank uneingeschränkten Zugang hat, können mit Zustimmung der Aufsichtsbehörde dazu verwendet werden, den Abzug vornehmen zu können, wird der Fehlbetrag vom harten Kernkapital abzuziehen ist, als die Summe sämtlicher Beteiligungspositionen, die insgesamt mehr als 10% des harten Kernkapitals in voller Höhe zu berücksichtigen (d.h. Dies wäre im Rahmen der standardisierten CVA-Risikokapitalanforderungen gemäss Absatz 104 für anwendbar. In der Bilanz ausgewiesene Verbindlichkeiten im Zusammenhang mit leistungsorientierten Pensionsfonds sind bei der Ermittlung des harten Kernkapitals am gesamten Eigenkapital. Für Netting-Sets, die entweder mindestens ein Geschäft mit illiquiden Sicherheiten oder ein ausserbörsliches Derivat enthalten, das nicht ohne Weiteres ersetzt werden kann“ im Kontext angespannter Marktbedingungen auszulegen; sie sind gekennzeichnet durch ein Fehlen kontinuierlich aktiver Märkte, auf denen ein Kontrahent innerhalb von höchstens zwei Tagen mehrere Preisquotierungen erhält, die den entsprechenden risikogewichteten Eigenkapitalanforderungen im Handelsbuch für das spezifische Zinsänderungsrisiko zugelassen sind, beziehen diese Nicht-IMM-Netting-Sets gemäss Absatz 98 ein, es sei denn, die nationale Aufsichtsinstanz erklärt für diese Portfolios Absatz 104 einbezogen werden. Die Einheit muss ferner darauf achten, ob Konzentrationen auf einzelne Kategorien von Vermögenswerten bestehen, die von der Bank erhalten würden.",
    avatar: "snake",
    playerId: "4",
    id: randID(),
    timestamp: ts(),
  },
  {
    text: "Older message here",
    avatar: "snake",
    playerId: "5",
    id: randID(),
    timestamp: ts(),
  },
  {
    text: "Well that was a bummer",
    avatar: "parrot",
    playerId: "1",
    self: true,
    id: randID(),
    timestamp: ts(),
  },
  {
    text: "I say we all put everything we got",
    avatar: "elephant",
    playerId: "2",
    id: randID(),
    timestamp: ts(),
  },
  {
    text: "I don't think so...",
    avatar: "moose",
    playerId: "3",
    id: randID(),
    timestamp: ts(),
  },
];

export function Stage1() {
  return (
    <div className="h-full grid grid-rows-[min-content_1fr]">
      <NormalHeader />
      <div className="h-full ">
        <div className="h-full grid grid-cols-12 grid-flow-row justify-center">
          <div className="h-full relative col-start-1 col-end-4">
            <div className="h-full relative flex items-center justify-center pb-48">
              <You animal="crocodile" />
            </div>
            <div className="h-full w-full absolute bottom-0 left-0 pointer-events-none">
              <div className="pr-20 h-full ">
                <ChatExample messages={messages} playerId="1" avatar="parrot" />
              </div>
            </div>
          </div>
          <div className="h-full flex items-center justify-center col-start-4 col-end-9">
            <AddCoins
              header="You can contribute up to 20 coins this round"
              footer="The pot will be multiplied by x3 and divided equally among the group at the end of the round"
              submittedText="You have submitted your contribution. Waiting on the other players"
              purse={20}
              multiplier={3}
              contributed={5}
              onClick={(amount) => console.log(`Added ${amount}`)}
            />
          </div>
          <div className="h-full grid grid-rows-1 col-start-9 col-end-13">
            <PlayerGrid key={15}>
              {Array.from(Array(15).keys()).map((_, i) => (
                <div dir="ltr" key={AnimalList[i]} className="w-16">
                  <Avatar animal={AnimalList[i]} />
                </div>
              ))}
            </PlayerGrid>
            <div className="px-4 text-center">
              <Label color="gray">
                The other players can also contribute their coins to the pot
                right now
              </Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Stage2() {
  return (
    <div className="h-full grid grid-rows-[min-content_1fr]">
      <NormalHeader />
      <div className="h-full ">
        <div className="h-full grid grid-cols-12 grid-flow-row justify-center">
          <div className="h-full relative col-start-1 col-end-4">
            <div className="h-full relative flex items-center justify-center pb-48">
              <You animal="crocodile" />
            </div>
            <div className="h-full w-full absolute bottom-0 left-0 pointer-events-none">
              <div className="pr-20 h-full ">
                <ChatExample messages={messages} playerId="1" avatar="parrot" />
              </div>
            </div>
          </div>
          <div className="flex flex-col h-full items-center justify-center col-start-4 col-end-9">
            <CoinResults
              contributedYou={8}
              contributedOthers={87}
              contributedTotal={8 + 87}
              contributedMultiplied={(8 + 87) * 3}
              multiplier={3}
              received={12}
              playerCount={16}
            />
            <div className="w-full px-32">
              <Button onClick={() => console.log("I'm done")}>I'm done</Button>
            </div>
          </div>
          <div className="h-full grid grid-rows-1 col-start-9 col-end-13">
            <PlayerGrid key={15}>
              {Array.from(Array(15).keys()).map((_, i) => (
                <div dir="ltr" key={AnimalList[i]} className="w-[6.5rem]">
                  <AvatarDeduction
                    animal={AnimalList[i]}
                    contributed={i === 0 ? "81" : "5"}
                    punishmentExists
                    deducted={i === 0 || i === 8 || i === 12 ? 8 : 0}
                  />
                </div>
              ))}
            </PlayerGrid>
            <div className="px-4 text-center">
              <Label color="purple">
                Deductions: It will cost you 2 coins to impose a deduction of 6
                coins.
              </Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Mock() {
  return <div className="p-8">Cool</div>;
}

export function Stage3() {
  return (
    <div className="h-full grid grid-rows-[min-content_1fr]">
      <NormalHeader />
      <div className="h-full ">
        <div className="h-full grid grid-cols-12 grid-flow-row justify-center">
          <div className="h-full relative col-start-1 col-end-4">
            <div className="h-full relative flex items-center justify-center pb-48">
              <AvatarScores
                hints
                animal={"crocodile"}
                given="0"
                received="78"
                contributed="0"
                gains={-320}
              />
            </div>
            <div className="h-full w-full absolute bottom-0 left-0 pointer-events-none">
              <div className="pr-20 h-full ">
                <ChatExample messages={messages} playerId="1" avatar="parrot" />
              </div>
            </div>
          </div>
          <div className="h-full col-start-4 col-end-13 pl-32">
            <PlayerGrid key={15}>
              {Array.from(Array(15).keys()).map((_, i) => (
                <div dir="ltr" key={AnimalList[i]} className="">
                  <AvatarScores
                    submitted
                    animal={AnimalList[i]}
                    given="0"
                    received="78"
                    contributed={i % 3 == 0 ? "245" : "12"}
                    gains={i % 9 == 0 ? 245 : i % 3 == 0 ? -17 : 12}
                  />
                </div>
              ))}
            </PlayerGrid>
          </div>
        </div>
      </div>
    </div>
  );
}
