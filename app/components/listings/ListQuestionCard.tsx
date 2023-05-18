"use client";

import { SafeListSetQuestion, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "../Button";

interface ListQuestionCardProps {
  currentUser?: SafeUser | null;
  data: SafeListSetQuestion;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
}

const ListQuestionCard = (props: ListQuestionCardProps) => {
  const { data, disabled } = props;

  const router = useRouter();

  return (
    <div
      className="
        col-span-1 cursor-pointer group
      "
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
          aspect-square
          w-full
          relative
          overflow-hidden
          rounded-xl
          border-black
        "
        >
          <Image
            fill
            alt="Listings"
            src="https://as1.ftcdn.net/v2/jpg/02/22/02/82/1000_F_222028277_2Py37TOH5GnHPX9nLVjU6X1lfcF5fDcY.jpg"
            className="
              object-cover
              h-full
              w-full
              group-hover:scale-110
              transition
            "
          />
        </div>
        <div className="font-semibold text-lg">{data?.listQuestionName}</div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            Number of Questions: {data?.questionNumber}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <Button
            disabled={disabled}
            outline
            small
            label="Edit"
            onClick={() => router.push(`/listquestions/edit/${data.id}`)}
          />
          <Button
            disabled={disabled}
            small
            label="Play"
            onClick={() => router.push(`/listquestions/play/${data.id}`)}
          />
        </div>
      </div>
    </div>
  );
};

export default ListQuestionCard;
