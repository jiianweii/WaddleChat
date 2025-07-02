import React from "react";
import Text from "./Text";
import { Icon } from "@iconify/react";

interface MessageProps {
  type: string;
  myUsername?: string;
  username: string;
  message: string;
}

export default function Message({
  type,
  myUsername,
  username,
  message,
}: MessageProps) {
  return (
    <div className="w-full">
      {type === "activity" && (
        <div className="text-center">
          <Text>
            <strong>{username}</strong> {message}
          </Text>
        </div>
      )}
      {type === "message" &&
        (myUsername !== username ? (
          <div className="flex items-start gap-2 mt-[20px]">
            <div className="p-0.5 border-1 rounded-full">
              <Icon icon="mdi:user" fontSize={35} />
            </div>
            <div className="mt-[-8px]">
              <Text>
                <strong>{username}</strong>
              </Text>
              <div className="p-2 min-w-fit border-1 border-[#00000090] rounded-2xl">
                <Text>{message}</Text>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-1 justify-end">
            <div className="p-2 min-w-fit border-1 border-[#00000090] rounded-2xl">
              <Text>{message}</Text>
            </div>
          </div>
        ))}
    </div>
  );
}
