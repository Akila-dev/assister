import { defineField, defineType } from "sanity";
// import { UserIcon } from 'lucide-react';

export const assister_chat = defineType({
  name: "assister_chat",
  title: "Chat With Assister",
  type: "document",
  // icon: UserIcon,
  fields: [
    defineField({
      name: "message",
      title: "User Message",
      type: "string",
    }),
    defineField({
      name: "sender",
      title: "sender",
      type: "reference",
      to: { type: "user" },
    }),
    defineField({
      name: "response",
      title: "AI Response",
      type: "text",
    }),
    defineField({
      name: "response_time",
      title: "Response Time",
      type: "string",
    }),
  ],
});
