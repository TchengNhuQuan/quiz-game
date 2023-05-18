"use client";

import { QuestionList } from "./ListQuestionPlayingClient";
import styles from "./questionCard.module.scss";
import cx from "classnames";

interface QuestionCardProps {
  listOfQuestions: QuestionList[];
  currentQuestion: number;
  isCorrect: boolean;
  checkAnswer: (e: any) => void;
  userAnswer?: string;
}

const QuestionCard = (props: QuestionCardProps) => {
  const {
    listOfQuestions,
    currentQuestion,
    isCorrect,
    checkAnswer,
    userAnswer,
  } = props;

  return (
    <div className={styles.container}>
      <h1 className={styles.quizQuestion}>
        {listOfQuestions[currentQuestion].question}
      </h1>
      <div className={styles.quizAnswers}>
        <div className={styles.row}>
          <div
            className={cx(styles.column, styles.button, {
              [styles.isCorrect]:
                listOfQuestions[currentQuestion]?.answerA ===
                  listOfQuestions[currentQuestion]?.correctAnswer && userAnswer,
              [styles.isFalse]:
                userAnswer &&
                userAnswer === listOfQuestions[currentQuestion]?.answerA &&
                userAnswer !== listOfQuestions[currentQuestion]?.correctAnswer,
            })}
            onClick={() =>
              checkAnswer(listOfQuestions[currentQuestion]?.answerA)
            }
          >
            {listOfQuestions[currentQuestion]?.answerA}
          </div>
          <div
            className={cx(styles.column, styles.button, {
              [styles.isCorrect]:
                listOfQuestions[currentQuestion]?.answerB ===
                  listOfQuestions[currentQuestion]?.correctAnswer && userAnswer,
              [styles.isFalse]:
                userAnswer &&
                userAnswer === listOfQuestions[currentQuestion]?.answerB &&
                userAnswer !== listOfQuestions[currentQuestion]?.correctAnswer,
            })}
            onClick={() =>
              checkAnswer(listOfQuestions[currentQuestion]?.answerB)
            }
          >
            {listOfQuestions[currentQuestion]?.answerB}
          </div>
        </div>
        <div className={styles.row}>
          <div
            className={cx(styles.column, styles.button, {
              [styles.isCorrect]:
                listOfQuestions[currentQuestion]?.answerC ===
                  listOfQuestions[currentQuestion]?.correctAnswer && userAnswer,
              [styles.isFalse]:
                userAnswer &&
                userAnswer === listOfQuestions[currentQuestion]?.answerC &&
                userAnswer !== listOfQuestions[currentQuestion]?.correctAnswer,
            })}
            onClick={() =>
              checkAnswer(listOfQuestions[currentQuestion]?.answerC)
            }
          >
            {listOfQuestions[currentQuestion]?.answerC}
          </div>
          <div
            className={cx(styles.column, styles.button, {
              [styles.isCorrect]:
                listOfQuestions[currentQuestion]?.answerD ===
                  listOfQuestions[currentQuestion]?.correctAnswer && userAnswer,
              [styles.isFalse]:
                userAnswer &&
                userAnswer === listOfQuestions[currentQuestion]?.answerD &&
                userAnswer !== listOfQuestions[currentQuestion]?.correctAnswer,
            })}
            onClick={() =>
              checkAnswer(listOfQuestions[currentQuestion]?.answerD)
            }
          >
            {listOfQuestions[currentQuestion]?.answerD}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
