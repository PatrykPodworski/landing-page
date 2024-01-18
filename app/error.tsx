"use client";

import Link from "next/link";

// TODO: Link the contact page when it's ready
const Error = () => {
  return (
    <div className="bg-blue-800 text-white p-12 rounded-lg max-w-sm flex flex-col gap-2 items-center">
      <h1 className="text-4xl font-bold">Oops!</h1>
      <h2 className="font-bold">Something went wrong</h2>
      <p className="text-sm text-center">
        Please try again later. If the problem persists, contact me.
      </p>
      <Link
        href={"/"}
        className="rounded bg-white text-blue-800 p-2 font-bold mt-2"
      >
        Return to home
      </Link>
    </div>
  );
};

export default Error;
