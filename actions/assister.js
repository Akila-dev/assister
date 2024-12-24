"use server";

// import axios from "axios";
// import FormData from "form-data";
import { AIMessageSchema } from "@/schema";
import { parseServerActionResponse } from "@/utils";

import { writeClient } from "@/sanity/lib/write_client";

export const sendUserMessage = async (values, address) => {
  const validatedFields = AIMessageSchema.parse(values);

  if (!validatedFields) {
    return { error: "Invalid Fields!" };
  }

  const { message } = values;

  try {
    console.log("Starting to send user message");

    const chat = {
      message,
      sender: address,
    };

    const chat_message = await writeClient.create({
      _type: "assister_chat",
      ...chat,
    });

    if (chat_message) {
      return {
        ...chat_message,
        error: "",
        status: "SUCCESS",
      };
    } else {
      return {
        error: "Error while posting chat message",
        status: "ERROR",
      };
    }
  } catch (error) {
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const getAIResponse = async (id, message) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ASSISTER_BASE_URL}/api/v1/slm/${process.env.NEXT_PUBLIC_ASSISTER_HANDLE}/chat`,
      {
        method: "POST",
        headers: {
          "X-Api-Key": process.env.NEXT_PUBLIC_ASSISTER_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: message }),
      }
    );

    const ai_response = await res.json();
    console.log("🚀 ~ getAssisterResponse ~ data:", ai_response);

    if (res.ok && ai_response) {
      const upload_response = await writeClient
        .patch(id)
        .set({
          response: ai_response.message,
          response_time: ai_response.message_at,
        })
        .commit();

      if (upload_response) {
        return {
          response: 1,
        };
      } else {
        return {
          response: 0,
        };
      }
    } else {
      const upload_response = await writeClient
        .patch(id)
        .set({
          response: "Sorry, I couldn't get that",
          response_time: new Date(),
        })
        .commit();

      if (upload_response) {
        return {
          response: 1,
        };
      } else {
        return {
          response: 0,
        };
      }
    }
  } catch (error) {
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const getAssisterResponse = async (values) => {
  const validatedFields = AIMessageSchema.parse(values);

  if (!validatedFields) {
    return { error: "Invalid Fields!" };
  }

  const { message, sender, response, response_time } = values;

  try {
    const chat = {
      message,
      sender,
      response,
      response_time,
    };

    const chat_message = await writeClient.create({
      _type: "assister_chat",
      ...chat,
    });
    console.log(
      parseServerActionResponse({
        ...chat_message,
        error: "",
        status: "SUCCESS",
      })
    );

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ASSISTER_BASE_URL}/api/v1/slm/${process.env.NEXT_PUBLIC_ASSISTER_HANDLE}/chat`,
      {
        method: "POST",
        headers: {
          "X-Api-Key": process.env.NEXT_PUBLIC_ASSISTER_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: values.message }),
      }
    );

    const ai_response = await res.json();
    // console.log("🚀 ~ getAssisterResponse ~ data:", data);

    if (res.ok && ai_response) {
      const upload_response = await writeClient
        .patch(chat_message._id)
        .set({
          response: ai_response.message,
          response_time: ai_response.message_at,
        })
        .commit();

      if (upload_response) {
        return {
          response: 1,
        };
      } else {
        return {
          response: 0,
        };
      }
    } else {
      parseServerActionResponse({
        error: "Couldn't get AI response",
        status: "ERROR",
      });
    }

    // if (res.ok && data) {
    //   return {
    //     response: 1,
    //     data: data,
    //   };
    // } else {
    //   return {
    //     response: 0,
    //   };
    // }
  } catch (error) {
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
