/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useEffect } from "react";

import { MessageNResponse } from "@/components";

import { Assister_chat } from "@/sanity/types";

// export type Assister_Message_N_Response = Omit<Assister_chat, "response"> & {
//   response: Assister_response;
// };

const Messages = ({ messages }: { messages: Assister_chat[] }) => {
  const container = useRef<any>(null);

  useEffect(() => {
    container.current.scrollTop = container.current.scrollHeight;
  }, [messages]);

  return (
    <div
      id="message-container"
      className="flex flex-col h-full py-5 gap-4 overflow-y-auto overflow-x-clip"
      ref={container}
    >
      {messages.map(
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
      )}
    </div>
  );
};

export default Messages;
