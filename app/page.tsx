"use client";

import MainForm from "./_components/MainForm";
import { useUserContext } from "./_providers/UserProvider";

export default function Home() {
  const { username, setUsername } = useUserContext();
  return (
    <div className="flex justify-center items-center h-svh">
      <MainForm username={username} setUsername={setUsername} />
    </div>
  );
}
