"use client";

import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import Text from "./Text";
import TextField from "./TextField";
import { Icon } from "@iconify/react";
import { useUserContext } from "../_providers/UserProvider";
import Message from "./Message";
import { redirect, RedirectType } from "next/navigation";

interface MessagesProp {
  name: string;
  type: string;
  message: string;
}

export default function ChatForm() {
  const [userCount, setUserCount] = useState(0);
  const [messages, setMessages] = useState<MessagesProp[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const { username } = useUserContext();

  const scrollRef = useRef<HTMLDivElement | null>(null);

  if (!username) redirect("/", RedirectType.replace);

  // Create WebSocket connection.
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const current = scrollRef.current;
    if (!current) return;

    current.scrollTop = current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3001");
    socketRef.current = socket;
    // Connection opened
    socket.addEventListener("open", () => {
      const message = {
        name: username,
        type: "activity",
        message: "has joined the chat.",
      };
      setMessages((prev) => [...prev, message]);
      socket.send(JSON.stringify(message));
    });
    // Listen for messages
    // Two TYPES of messages: ONE is for user arrival, TWO is for message received.
    socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [...prev, message]);
      if (message?.userCount) setUserCount(message.userCount);
    });

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        const message = {
          name: username,
          type: "activity",
          message: "has left the chat.",
        };
        setMessages((prev) => [...prev, message]);
        socket.send(JSON.stringify(message));
      }
      socket.close();
    };
  }, [username]);

  const sendMessage = () => {
    const message = {
      name: username,
      type: "message",
      message: currentMessage,
    };

    setMessages((prev) => [...prev, message]);
    socketRef.current?.send(JSON.stringify(message));

    setCurrentMessage("");
  };

  return (
    <div className="h-[80%] w-[600px] bg-white rounded-[12px] shadow-2xl">
      <div className="flex h-[10%] border-b-1 border-[#00000050] items-center justify-between px-2.5">
        <Button handleClick={() => redirect("/", RedirectType.replace)}>
          <Icon icon="formkit:arrowleft" />
        </Button>
        <div className="flex flex-col text-center">
          <Text className="text-[1.7rem] font-bold">Room 1</Text>
          <Text className="text-[0.7rem] font-semibold">
            Participants: {userCount}
          </Text>
        </div>
        {/* <Button className="border-1 rounded-full p-1">
          <Icon icon="mdi:users" fontSize={30} />
        </Button> */}
        <div></div>
      </div>
      <div
        className="flex h-[80%] flex-col p-4 overflow-y-auto gap-2"
        ref={scrollRef}
      >
        {/* AUTO SCROLL TO BOTTOM HERE */}
        {messages?.map((m, i) => {
          if (m?.name) {
            return (
              <Message
                key={i}
                username={m.name}
                myUsername={username}
                type={m.type}
                message={m.message}
              />
            );
          }
        })}
      </div>
      <div className="flex h-[10%] border-t-1 border-[#00000050] justify-center items-center py-2 gap-2">
        <div className="w-[80%] h-full flex items-center">
          <TextField
            placeholder="Enter Your Message"
            className="h-full"
            setValue={setCurrentMessage}
            value={currentMessage}
            handleSubmit={sendMessage}
          />
        </div>
        <Button
          className="bg-[var(--PURPLE)] px-4 py-3 h-full"
          handleClick={sendMessage}
        >
          <Icon icon="material-symbols:send" fontSize={30} color="#fff" />
        </Button>
      </div>
    </div>
  );
}
