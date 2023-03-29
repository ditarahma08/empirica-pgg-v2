import React from "react";
import { Chat } from "./Chat";
import { Highlighter } from "./Highlighter";

export function MockChatView({
  player,
  messages,
  onMessage,
  name,
  highlight,
  showChat,
}) {
  if (!showChat) {
    return null;
  }

  return (
    <div className="h-full w-full absolute bottom-0 left-0 pointer-events-none pgg-chat">
      <div className="pr-20 h-full ">
        <Highlighter pad name={name} highlight={highlight}>
          <Chat
            messages={messages}
            avatar={player.avatar}
            onNewMessage={(t) => {
              const text = t.trim();

              if (text.length === 0) {
                return;
              }

              onMessage({
                text,
                avatar: player.avatar,
                playerId: player._id,
                id: randID(),
                timestamp: Date.now(),
              });
            }}
          />
        </Highlighter>
      </div>
    </div>
  );
}

function randID() {
  return Math.random().toString(16).slice(8);
}
