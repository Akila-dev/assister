import { type SchemaTypeDefinition } from "sanity";

import { assister_chat } from "@/sanity/schemaTypes/assister_chat";
import { assister_response } from "@/sanity/schemaTypes/assister_response";
import { user } from "@/sanity/schemaTypes/user";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [assister_chat, assister_response, user],
};
