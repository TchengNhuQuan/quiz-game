"use client";

import useCreateSetOfQuestionModal from "@/app/hooks/useCreateSetOfQuestionModal";
import Modal from "./Modal";
import { useState } from "react";
import Heading from "../Heading";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const SetOfQuestionModal = () => {
  const router = useRouter();
  const createSetOfQuestionModal = useCreateSetOfQuestionModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      listQuestionName: "",
      questionNumber: 1,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    const foundUserName = localStorage.getItem("userName");
    const foundPassword = localStorage.getItem("password");

    const foundUserId = await axios.post(
      `http://localhost:8080/user/currentUser/?username=${foundUserName}&password=${foundPassword}`
    );

    const refactorData = {
      listQuestionName: data.listQuestionName,
      questionNumber: data.questionNumber,
      users: {
        id: Number(foundUserId.data.id),
      },
    };

    axios
      .post("http://localhost:8080/listquestion/newListQuestion", refactorData)
      .then(() => {
        toast.success("Set of Questions Created!");
        router.refresh();
        reset();
        createSetOfQuestionModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Please fill out the form below"
        subtitle="Let us help you create set of question you want!"
      />
      <Input
        id="listQuestionName"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="questionNumber"
        label="Number of questions"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  return (
    <Modal
      isOpen={createSetOfQuestionModal.isOpen}
      onClose={createSetOfQuestionModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Create"
      title="Create set of questions"
      body={bodyContent}
    />
  );
};

export default SetOfQuestionModal;
