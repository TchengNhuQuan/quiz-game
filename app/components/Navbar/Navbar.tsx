"use client";

import Container from "../Container";
import WelcomeTitle from "./WelcomeTitle";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";
import { useEffect, useState } from "react";

interface NavbarProps {
  currentUser?: SafeUser | null | string;
}

const Navbar: React.FC<NavbarProps> = () => {
  const [currentUser, setCurrentUser] = useState<string | null>("");

  useEffect(() => {
    const currentUser = localStorage.getItem("userName");
    setCurrentUser(currentUser);
  });

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div
        className="
          py-4 
          border-b-[1px]
        "
      >
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <WelcomeTitle />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
