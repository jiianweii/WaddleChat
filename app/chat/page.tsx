import { Metadata } from "next";
import React from "react";
import ChatForm from "../_components/ChatForm";

export const metadata: Metadata = {
  title: "Quack Chat",
};

export default function Page() {
  return (
    <div className="flex h-svh justify-center items-center">
      <ChatForm />
    </div>
  );
}
