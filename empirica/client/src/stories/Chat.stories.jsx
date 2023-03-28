import React from "react";
import { ChatExample } from "../components/Chat";
import { You } from "../components/You";

function randID() {
  return Math.random().toString(16).slice(8);
}

let start = 30;
function ts() {
  start--;
  return new Date(Date.now() - 1000 * start);
}

export const MyChat = () => {
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

  return (
    <div className="relative h-full w-full outline">
      <div className="flex justify-center pt-40 h-full w-1/3">
        <You animal="parrot" />
      </div>
      <div className="w-1/3 h-full absolute bottom-0 left-0 pointer-events-none">
        <div className="pr-20 h-full ">
          {/* <ChatExample messages={messages} playerId="1" avatar="parrot" /> */}
          <ChatExample messages={[]} playerId="1" avatar="parrot" />
        </div>
      </div>
    </div>
  );
};
