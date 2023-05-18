"use client";

import Container from "@/app/components/Container";
import styles from "./listQuestionClient.module.scss";
import cx from "classnames";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Modal from "@/app/components/modals/Modal";

interface ListQuestionClientProps {
  numberOfQuestion?: number;
  listQuestionsId?: string;
}

const ListQuestionClient = (props: ListQuestionClientProps) => {
  const router = useRouter();
  const { numberOfQuestion, listQuestionsId } = props;
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      question: "",
      answerA: "",
      answerB: "",
      answerC: "",
      answerD: "",
      correctAnswer: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    const refactorData = {
      question: data.question,
      answerA: data.answerA,
      answerB: data.answerB,
      answerC: data.answerC,
      answerD: data.answerD,
      correctAnswer: data.correctAnswer,
      listQuestionsId: {
        id: listQuestionsId,
      },
    };

    await axios
      .post(`http://localhost:8080/question/newQuestion`, refactorData)
      .then((res) => {
        setIsLoading(false);
        toast.success(`Create Question No.${currentQuestion} successfully`);
        reset();
        if (numberOfQuestion && currentQuestion < numberOfQuestion) {
          setCurrentQuestion((pre) => pre + 1);
        }
        if (currentQuestion === numberOfQuestion) {
          router.push("/");
        }
      })
      .catch((error) => {
        toast.error("Something went wrong. Please try again");
      });
  };

  return (
    <>
      <Container>
        <div className={styles.main}>
          <div className={styles.headerContainer}>
            <div className={cx(styles.grid, styles.wide)}>
              <div className={styles.header}>
                <div className={styles.headerLogo}>
                  <h1>
                    Create your own Questions {currentQuestion} /{" "}
                    {numberOfQuestion}
                  </h1>
                </div>
                <div className={styles.containerBtn}>
                  <button
                    className={cx(styles.btn, styles.btnPreview)}
                    onClick={handleSubmit(onSubmit)}
                  >
                    Save
                  </button>
                  <button
                    className={cx(styles.btn, styles.btnExit)}
                    onClick={() => router.push("/")}
                  >
                    Exit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={cx(styles.grid, styles.wide)}>
            <div className={styles.container}>
              <div className={cx(styles.containerCreate, styles.ques)}>
                <input
                  disabled={isLoading}
                  {...register("question", { required: true })}
                  id="question"
                  type="text"
                  maxLength={120}
                  placeholder="Start typing your question"
                  className={cx(styles.containerCreateInput, {
                    [styles.error]: errors,
                  })}
                />
              </div>
              <div className={cx(styles.containerCreate, styles.ans)}>
                <div className={styles.boxCreateAns}>
                  <span className={cx(styles.alphabet, styles.alphbatA)}>
                    A
                  </span>
                  <input
                    disabled={isLoading}
                    {...register("answerA", { required: true })}
                    id="answerA"
                    type="text"
                    className={cx(styles.containerCreateInput, styles.inputAns)}
                    placeholder="Add answer 1"
                  />
                </div>
                <div className={styles.boxCreateAns}>
                  <span className={cx(styles.alphabet, styles.alphabetB)}>
                    B
                  </span>
                  <input
                    disabled={isLoading}
                    {...register("answerB", { required: true })}
                    id="answerB"
                    type="text"
                    className={cx(styles.containerCreateInput, styles.inputAns)}
                    placeholder="Add answer 2"
                  />
                </div>
                <div className={styles.boxCreateAns}>
                  <span className={cx(styles.alphabet, styles.alphabetC)}>
                    C
                  </span>
                  <input
                    disabled={isLoading}
                    {...register("answerC", { required: true })}
                    id="answerC"
                    type="text"
                    className={cx(styles.containerCreateInput, styles.inputAns)}
                    placeholder="Add answer 3"
                  />
                </div>
                <div className={styles.boxCreateAns}>
                  <span className={cx(styles.alphabet, styles.alphabetD)}>
                    D
                  </span>
                  <input
                    disabled={isLoading}
                    {...register("answerD", { required: true })}
                    id="answerD"
                    type="text"
                    className={cx(styles.containerCreateInput, styles.inputAns)}
                    placeholder="Add answer 4"
                  />
                </div>
                <div
                  className={cx(styles.boxCreateAns, styles.correctAnswerbox)}
                >
                  <span className={cx(styles.alphabet, styles.alphabetCorrect)}>
                    Correct
                  </span>
                  <input
                    disabled={isLoading}
                    {...register("correctAnswer", { required: true })}
                    id="correctAnswer"
                    type="text"
                    className={cx(styles.containerCreateInput, styles.inputAns)}
                    placeholder="Add Correct Answer"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.overlay}></div>
        </div>
      </Container>
    </>
  );
};

export default ListQuestionClient;
