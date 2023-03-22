import React, { useEffect, useState } from "react";
import ChatCard from "./ChatCard";
import Plane from "../assets/Plane.svg";
import { useConnectionContext } from "../context/ConnectionContext";

function Chat() {
  const [newChat, setNewChat] = useState("");
  const { handleNewChat, localGameState, username } = useConnectionContext();
  const [chatDisable, setChatDisable] = useState(false);
  const [guessNum, setGuessNum] = useState(3);
  useEffect(() => {
    localGameState.players.map(player => {
        if(player.username == username){
            setGuessNum(player.guesses)
        }
    })
  },[localGameState])
  useEffect(() => {
    if(guessNum == 0){
        setChatDisable(true)
    }
    else{
        setChatDisable(false)
    }
  },[guessNum])

  const sendChat = () => {
    handleNewChat(newChat);
    setNewChat("");
  };
  
  return (
    <div className="flex flex-col col-span-1">
      <div className="font-display text-white text-4xl pl-2 w-full text-center">
        Chat
      </div>
      <div className="bg-[#e7e7e7] h-full p-4 flex flex-col w-full justify-between">
        <div className="flex flex-col gap-2">
          {localGameState.chatMessages.length
            ? localGameState.chatMessages?.map((c, index) => (
                <ChatCard
                  key={index}
                  name={c["username"]}
                  chat={c["message"]}
                  correct={c["message"] === localGameState.currentWord}
                ></ChatCard>
              ))
            : null}
        </div>
        <div>
          <div className="flex gap-2 w-full">
            <input
              placeholder={chatDisable ? "Out of guesses!" : "Guess a word..."}
              className="grow col-span-3 border-2 p-2 min-w-0 border-black focus:outline-blue focus:rounded-none"
              value={newChat}
              onChange={(e) => setNewChat(e.target.value)}
              disabled={chatDisable}
            ></input>
            <button
              className="flex-none w-14 h-14 items-center justify-center col-span-1 font-display bg-red text-white p-2 text-xl disabled:bg-gray-400 disabled:text-black transition duration-200 shadow-md"
              onClick={sendChat}
              disabled={newChat === "" || chatDisable}
            >
              <img src={Plane}></img>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
