import Link from "next/link";
import React from "react";

type authFormFooter = {
  text: string;
  linkText: string;
  linkHref: string;
};

export default function AuthFormFooter({
  text,
  linkText,
  linkHref = "/",
}: authFormFooter) {
  return (
    <div className=" mt-9 font-mono text-gray-500 text-center">
      {text}
      <Link className="text-blue-600 ms-3" href={linkHref}>
        {linkText}
      </Link>
    </div>
  );
}
