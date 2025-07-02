"use client";

import Image from "next/image";
import React, { useState } from "react";
import logo from "@/public/logo.png";
import TextField from "./TextField";
import Link from "next/link";

interface MainFormProps {
  username: string;
  setUsername: (value: string) => void;
}

export default function MainForm(props: MainFormProps) {
  const [isNameFilled, setIsNameFilled] = useState(true);

  const setCapitalizedUsername = (value: string) => {
    props.setUsername(
      value
        ?.trim()
        ?.split(" ")
        ?.map((d: string) => d[0].toUpperCase() + d.slice(1))
        .join(" ")
    );
  };

  const convertToLower = (value: string) => {
    props.setUsername(value.toLowerCase());
  };

  return (
    <div className="h-[60%] w-[400px] flex flex-col justify-center items-center gap-10 bg-white rounded-[12px] shadow-2xl">
      <div className="size-[100px]">
        <Image src={logo} alt="logo, its basically a blue duck" />
      </div>
      <div className="flex flex-col gap-3 items-center w-[70%]">
        <TextField
          placeholder={
            isNameFilled ? "Enter Your Name" : "Need 3-20 characters"
          }
          value={props.username}
          setValue={convertToLower}
          className="capitalize"
        />
        <Link
          href="/chat"
          className="bg-[var(--PURPLE)] text-white p-4 font-semibold rounded-lg w-full text-center"
          onClick={(e) => {
            if (props.username.length < 3 || props.username.length > 20) {
              setIsNameFilled(false);
              props.setUsername("");
              e.preventDefault();
              return;
            }

            setCapitalizedUsername(props.username);
          }}
        >
          Join Chat
        </Link>
      </div>
    </div>
  );
}
