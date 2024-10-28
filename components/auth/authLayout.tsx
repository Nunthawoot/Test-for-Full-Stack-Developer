"use client";
import { Image } from "@nextui-org/react";

interface Props {
  children: React.ReactNode;
}

export const AuthLayoutWrapper = ({ children }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 min-h-screen bg-green-500">
      <div
        id="2"
        className="order-1 sm:order-2 col-span-1 sm:col-span-2 bg-green-300 grid content-center justify-items-center rounded-b-[36px] sm:rounded-l-[36px]"
      >
        <Image
          src="/images/notebook with pencil, highlighter pen and papers.png"
          alt="signin"
          width={299.61}
          height={230}
        />
        <div className="text-center text-white text-custom-28 italic">
          a Board
        </div>
      </div>
      <div
        id="1"
        className="order-2 sm:order-1 col-span-1 sm:col-span-3 grid content-center justify-items-center"
      >
        {children}
      </div>
    </div>
  );
};
