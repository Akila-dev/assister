/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useEffect, useState } from "react";

import { MessageNResponse } from "@/components";

import { Assister_chat } from "@/sanity/types";
import { useGlobalChatsStore } from "@/utils";
import { useAppKitAccount } from "@reown/appkit/react";

const Messages = ({ messages }: { messages: Assister_chat[] }) => {
  const isGlobal = useGlobalChatsStore((state: any) => state.globalChats);
  const container = useRef<any>(null);
  const [filteredMessages, setFilteredMessages] = useState(messages || []);
  const { address } = useAppKitAccount();

  // console.log(address);
  // console.log(messages);

  useEffect(() => {
    container.current.scrollTop = container.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (!isGlobal) {
      setFilteredMessages(
        messages?.filter((message) => message?.sender === address)
      );
    } else {
      setFilteredMessages(messages);
    }
    container.current.scrollTop = container.current.scrollHeight;
  }, [isGlobal, messages, address]);

  return (
    <div
      id="message-container"
      className="flex flex-col h-full py-5 gap-4 overflow-y-auto overflow-x-clip"
      ref={container}
    >
      {filteredMessages.length > 0 ? (
        filteredMessages.map(
          (
            { message, response, response_time, _createdAt }: Assister_chat,
            i: number
          ) => (
            <div key={i} className="container !py-0">
              <MessageNResponse
                key={i}
                message={message}
                response={response}
                response_time={response_time}
                time={_createdAt}
              />
            </div>
          )
        )
      ) : (
        <div className="container h-full flex-center w-full flex-col">
          <p className="!italic opacity-60">No message sent</p>
        </div>
      )}
    </div>
  );
};

export default Messages;
