import getNumberOfQuestionsById from "@/app/actions/getNumberOfQuestionById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListQuestionClient from "./ListQuestionClient";
import getAllQuestionInListById from "@/app/actions/getAllQuestionInListById";

interface IParams {
  listquestionId?: string;
}

const ListQuestionCreatePage = async ({ params }: { params: IParams }) => {
  // B1: lay list question iid
  // B2: lay number of list question bang cach truyen qua prop
  // B3: tu number of list question thi render ra list question tuong ung
  // B4: thu goi api call tao list question

  // -----
  // B1: lay listquestion da co san, neu du roi thi khong can edit nua
  const { listquestionId } = params;
  const numberOfQuestions: number = await getNumberOfQuestionsById(params);
  const allQuestionInList = await getAllQuestionInListById(params);

  if (allQuestionInList.length === numberOfQuestions) {
    return (
      <ClientOnly>
        <EmptyState
          title="Can not edit question for this set of questions"
          subtitle="Since this set of question have create full questions"
        />
      </ClientOnly>
    );
  }

  if (numberOfQuestions === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No questions for this set of questions"
          subtitle="Add the first questions!"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListQuestionClient
        numberOfQuestion={numberOfQuestions}
        listQuestionsId={listquestionId}
      />
    </ClientOnly>
  );
};

export default ListQuestionCreatePage;
