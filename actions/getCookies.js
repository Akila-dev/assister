import { headers } from "next/headers";

export const getCookies = async () => {
  const headerObj = await headers();
  const cookies = await headerObj.get("cookie");
  // const cookies = await headers();

  return cookies;
};
