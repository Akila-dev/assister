/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
// import React,{useState,useEffect} from "react";

import { SubmitButton, Button } from "@/components";
import { Play } from "lucide-react";

// Form
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AIMessageSchema, AIMessageSchemaType } from "@/schema";
import { sendUserMessage, getAIResponse } from "@/actions/assister";
// import { useAccountStore } from "@/utils";

// ! Web 3
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";

const AssisterForm = () => {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const [sendingMessage, setSendingMessage] = useState(false);

  // const userId = useAccountStore((state: any) => state.userId);

  // const [userId, setUserId] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AIMessageSchemaType>({
    resolver: zodResolver(AIMessageSchema),
    // defaultValues: {
    //   message: "",
    //   sender: address || "",
    //   response: "",
    //   response_time: "",
    // },
  });

  const onSubmit: SubmitHandler<AIMessageSchemaType> = (values) => {
    setSendingMessage(true);
    sendUserMessage(values, address).then((data) => {
      // console.log("🚀 ~ sendUserMessage ~ data:", data);
      setSendingMessage(false);
      if (data?.status === "SUCCESS") {
        getAIResponse(data?._id, data?.message).then((res) => {
          if (res.response === 1) {
            console.log("OK");
          } else {
            console.log("DAMN");
          }
        });
      }
    });
  };

  return (
    <>
      {isConnected ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full py-5 border-t border-white/10 shadow-xl shadow-white/5"
        >
          <div className="container !py-0">
            <div>
              <div
                className={`flex w-full gap-3 py-2 px-4 rounded-xl bg-white/5 backdrop-blur-md relative ${errors?.message ? "ring-2 ring-red-500" : ""}`}
              >
                <textarea
                  // type="text"
                  className={`w-full !bg-transparent text-light placeholder:text-light/50 placeholder:font-light focus:!ring-0 focus:outline-none resize-none ${sendingMessage ? "opacity-50 pointer-events-none" : ""}`}
                  rows={3}
                  autoFocus
                  maxLength={1000}
                  placeholder="Pay $100 to send a message"
                  {...register("message")}
                />

                <SubmitButton
                  text=""
                  className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-lg size-9 min-w-9 flex-center"
                  icon={<Play className="size-4" />}
                />
              </div>
              <p className="xs !text-red-500 pt-2">
                {errors?.message?.message}
              </p>
            </div>
            <p className="w-full xs text-center opactity-90 pt-3">
              70% of message fees goes to the price pool
            </p>
          </div>
        </form>
      ) : (
        <div className="w-full py-5 border-t border-white/10 shadow-xl shadow-white/5">
          <div className="container !py-0">
            <div className="flex w-full gap-3 py-2 px-4 rounded-xl bg-white/5 backdrop-blur-md relative show-md justify-between items-center">
              <p className="input opacity-30">Connect Wallet to sent message</p>
              <Button
                text="Connect Wallet"
                onClick={() => open()}
                className="btn-1 !text-center !justify-center"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AssisterForm;
