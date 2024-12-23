/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";

import { SubmitButton, Button } from "@/components";
import { Play } from "lucide-react";

// Form
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AIMessageSchema, AIMessageSchemaType } from "@/schema";
import { getAssisterResponse } from "@/actions/assister";
import { useAppKit } from "@reown/appkit/react";
import { useAccountStore } from "@/utils";

// ! Web 3
import { createAppKit } from "@reown/appkit/react";
import { SolanaAdapter } from "@reown/appkit-adapter-solana/react";
import { solana, solanaTestnet, solanaDevnet } from "@reown/appkit/networks";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";

// 0. Set up Solana Adapter
const solanaWeb3JsAdapter = new SolanaAdapter({
  wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
});

// 1. Get projectId from https://cloud.reown.com
const projectId = process.env.NEXT_PUBLIC_WALLET_ID || "";

// 2. Create a metadata object - optional
const kitMetadata = {
  name: "Assister AppKit",
  description: "Assister AppKit Solana",
  url: "https://example.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// 3. Create modal
createAppKit({
  adapters: [solanaWeb3JsAdapter],
  networks: [solana, solanaTestnet, solanaDevnet],
  metadata: kitMetadata,
  projectId,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

// const user = {
//   id: "mkjhbvff766vffcv8v",
//   ref: "2b94f6dc-829e-42ee-a550-20ca46cdeec0",
//   //   id: "1653ghdbb-dh#dh",
// };

const AssisterForm = () => {
  const userId = useAccountStore((state: any) => state.userId);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AIMessageSchemaType>({
    resolver: zodResolver(AIMessageSchema),
  });

  const onSubmit: SubmitHandler<AIMessageSchemaType> = (values) => {
    getAssisterResponse(values).then((data) => {
      console.log("🚀 ~ AssisterForm ~ data:", data);
    });

    // console.log("🚀 ~ onSubmit ~ values:", values);
  };

  const { open } = useAppKit();

  return (
    <>
      {userId ? (
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
                  className={`w-full !bg-transparent text-light placeholder:text-light/50 placeholder:font-light focus:!ring-0 focus:outline-none resize-none`}
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
