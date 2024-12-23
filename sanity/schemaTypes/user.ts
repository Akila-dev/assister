import { defineField, defineType } from "sanity";
// import { UserIcon } from 'lucide-react';

export const user = defineType({
  name: "user",
  title: "User",
  type: "document",
  // icon: UserIcon,
  fields: [
    defineField({
      name: "id",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "id",
    },
  },
});
