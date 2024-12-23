import React from "react";
// import Link from "next/link";
import { ChatTopbar, AssisterForm, Messages } from "@/components";
import { ExamplePrompts } from "@/constants/staticText";

// SANITY/DB RELATED
import { GET_ASSISTER_MESSAGES } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
// import { QueryParams } from "sanity";

const Home = async () => {
  const { data: messages } = await sanityFetch({
    query: GET_ASSISTER_MESSAGES,
  });

  return (
    <>
      <div className="w-full h-full flex flex-col justify-between">
        <ChatTopbar
          intro="Outsmart Lyra, the guardian of the Quantum Nexus, to unlock the growing prize pool and claim cosmic rewards."
          examplePrompts={ExamplePrompts}
        />

        {/* ! MESSAGES DISPLAY */}

        <Messages messages={messages} />

        {/* ! INPUT */}
        <AssisterForm />
      </div>
      <SanityLive />
    </>
  );
};

export default Home;
