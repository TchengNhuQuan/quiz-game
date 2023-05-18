"use client";

import Container from "@/app/components/Container";
import { useState } from "react";
import styles from "./listQuestionPlayingClient.module.scss";
import QuestionCard from "./QuestionCard";
import FinalResult from "./FinalResult";
import cx from "classnames";
import axios from "axios";
import toast from "react-hot-toast";

export type AnswerObject = {
  question: string;
  answer: string;
  isCorrect: boolean;
  correctAnswer: string;
};

export type QuestionList = {
  question: string;
  answerA: string;
  answerB: string;
  answerC: string;
  answerD: string;
  correctAnswer: string;
};

interface ListQuestionPlayingClientProps {
  listOfQuestions: QuestionList[];
  listQuestionId: string | undefined;
}

const ListQuestionPlayingClient = (props: ListQuestionPlayingClientProps) => {
  const { listOfQuestions, listQuestionId } = props;
  const [showResults, setShowResults] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);

  const checkAnswer = (answer: string) => {
    if (answer === listOfQuestions[currentQuestion]?.correctAnswer) {
      setScore(score + 1);
      setIsCorrect(true);
    }

    const answerObject = {
      question: listOfQuestions[currentQuestion].question,
      answer: answer,
      isCorrect,
      correctAnswer: listOfQuestions[currentQuestion].correctAnswer,
    };

    setUserAnswers((prev) => [...prev, answerObject]);
  };

  function onNext() {
    if (currentQuestion + 1 < listOfQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  const onSubmit = async () => {
    setShowResults(true);
    const data = {
      point: score,
      listQuestions: {
        id: Number(listQuestionId),
      },
    };
    await axios
      .post("http://localhost:8080/answerHistory/saveHistory", data)
      .then(() => {
        toast.success("Submit successfully!");
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  return (
    <Container>
      <div className={styles.answerPage}>
        <div className={styles.quizInfoContainer}>
          <div className={styles.quizTitle}>{}</div>
          <div>Number of Questions: {listOfQuestions.length}</div>
          <div>Current Score: {score}</div>
        </div>
        {showResults ? (
          <FinalResult score={score} questions={listOfQuestions} />
        ) : (
          <QuestionCard
            listOfQuestions={listOfQuestions}
            currentQuestion={currentQuestion}
            isCorrect={isCorrect}
            checkAnswer={checkAnswer}
            userAnswer={userAnswers[currentQuestion]?.answer}
          />
        )}
        {userAnswers.length === currentQuestion + 1 &&
          currentQuestion !== listOfQuestions.length - 1 && (
            <button className={styles.quizButton} onClick={onNext}>
              Next
            </button>
          )}
        {userAnswers.length === currentQuestion + 1 &&
          currentQuestion === listOfQuestions.length - 1 &&
          !showResults && (
            <Container>
              <button
                className={cx(styles.quizButton, styles.submitButton)}
                onClick={onSubmit}
              >
                Submit
              </button>
            </Container>
          )}
      </div>
    </Container>
  );
};

export default ListQuestionPlayingClient;
