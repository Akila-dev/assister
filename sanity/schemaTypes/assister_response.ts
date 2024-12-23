import { defineField, defineType } from "sanity";
// import { UserIcon } from 'lucide-react';

export const assister_response = defineType({
  name: "assister_response",
  title: "Response from Assister",
  type: "document",
  // icon: UserIcon,
  fields: [
    defineField({
      name: "message",
      title: "User Message",
      type: "string",
    }),
  ],
});
