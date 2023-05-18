"use client";

import Heading from "@/app/components/Heading";
import styles from "./finalResult.module.scss";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";

interface FinalResulProps {
  score: number;
  questions: any;
}

const FinalResult = (props: FinalResulProps) => {
  const { score, questions } = props;
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Heading
        title="Final Results"
        subtitle={`${score} out of ${questions.length} correct - (
        ${(score / questions.length) * 100}%)`}
      />
      <hr />
      <Button label="Back to Homepage" onClick={() => router.push("/")} />
    </div>
  );
};

export default FinalResult;
