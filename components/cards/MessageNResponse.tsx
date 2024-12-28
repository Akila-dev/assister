import React from "react";
import Image from "next/image";
import moment from "moment";
import { Loading } from "@/components";

// import { Assister_chat } from "@/sanity/types";

import { images } from "@/constants";
// import { date } from "zod";

interface IMessage {
  message?: string;
  response?: string;
  response_time?: string;
  time: string;
}

const MessageNResponse = ({
  message,
  response,
  response_time,
  time,
}: IMessage) => {
  const time_diff = (val?: string) => {
    const date = new Date(val || "");
    const present_time = date.toUTCString();
    return moment(present_time).fromNow();
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3 w-full justify-end">
        <div className="user-message flex flex-col items-end gap-1">
          <p className="w-full text-black">{message}</p>
          <p className="xs !text-dark/50">{time_diff(time)}</p>
        </div>
      </div>

      <div className="flex gap-2 md:gap-3 w-full justify-start">
        <Image
          src={images.lyra}
          alt="user"
          className="size-[35px] lg:size-[40px] rounded-full object-cover"
        />
        {response ? (
          <div className="ai-message flex flex-col items-end gap-1">
            <p className="w-full">{response}</p>
            <p className="xs !text-light/50">{time_diff(response_time)}</p>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default MessageNResponse;
