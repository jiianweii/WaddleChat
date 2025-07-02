"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface UserContextDefault {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
}

const UserContext = createContext<UserContextDefault>({
  username: "",
  setUsername: () => {},
});

export function useUserContext() {
  return useContext(UserContext);
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState("");
  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
}
