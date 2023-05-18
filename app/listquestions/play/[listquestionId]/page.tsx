import ClientOnly from "@/app/components/ClientOnly";
import ListQuestionPlayingClient from "./ListQuestionPlayingClient";
import getAllQuestionInListById from "@/app/actions/getAllQuestionInListById";

interface IParams {
  listquestionId?: string;
}

const ListQuestionPlayingPage = async ({ params }: { params: IParams }) => {
  const { listquestionId } = params;
  const allQuestionInList = await getAllQuestionInListById(params);

  return (
    <ClientOnly>
      <ListQuestionPlayingClient
        listOfQuestions={allQuestionInList}
        listQuestionId={listquestionId}
      />
    </ClientOnly>
  );
};

export default ListQuestionPlayingPage;
