import { defineQuery } from "next-sanity";

export const GET_ASSISTER_MESSAGES =
  defineQuery(`*[_type=="assister_chat"] | order(_createdAt) {
  _createdAt,
  _id,
  message,
  sender->{id},
  response,
  response_time
}`);

// export const GET_ASSISTER_MESSAGES = defineQuery(`*[_type=="assister_chat"]{
//   _createdAt,
//   _id,
//   message,
//   sender->{id},
//   response->{
//     _id,
//     _type,
//     _createdAt,
//     _updatedAt,
//     _rev,
//     message
//   }
// }`);
