"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useState, useCallback, useEffect } from "react";
import MenuItem from "./MenuItem";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useCreateSetOfQuestionModal from "@/app/hooks/useCreateSetOfQuestionModal";

import { SafeUser } from "@/app/types";
import { toast } from "react-hot-toast";

interface UserMenuProps {
  currentUser?: SafeUser | null | string;
}
const UserMenu: React.FC<UserMenuProps> = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const createSetOfQuestionModal = useCreateSetOfQuestionModal();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleOpen = useCallback(() => {
    //*INFO: reverse the current value of isOpen
    setIsOpen((value) => !value);
  }, []);

  const [currentUser, setCurrentUser] = useState<string | null>("");

  useEffect(() => {
    const currentUser = localStorage.getItem("userName");
    setCurrentUser(currentUser);
  });

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    createSetOfQuestionModal.onOpen();
  }, [currentUser, loginModal, createSetOfQuestionModal]);

  const logOut = useCallback(() => {
    localStorage.removeItem("userName");
    localStorage.removeItem("password");

    setCurrentUser(null);
    toast.success("Log out successfully");
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="
            hidden
            md:block
            text-sm
            font-semibold
            py-3
            px-4
            rounded-full
            hover:bg-neutral-100
            transition
            cursor-pointer
          "
        >
          Create Set of Questions
        </div>
        <div
          onClick={toggleOpen}
          className="
            p-4
            md:py-1
            md:px-2
            border-[1px]
            border-neutral-200
            flex
            flex-row
            items-center
            gap-3
            rounded-full
            cursor-pointer
            hover:shadow-md
            transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src="/images/placeholder.jpg" />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="
            absolute
            rounded-xl
            shadow-md
            w-[40vw]
            md:w-3/4
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onClick={() => logOut()} label="Log out" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
