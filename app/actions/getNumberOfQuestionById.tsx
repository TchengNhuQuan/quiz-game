import axios from "axios";

interface IParams {
  listquestionId?: string;
}

export default async function getNumberOfQuestionsById(params: IParams) {
  try {
    const { listquestionId } = params;

    const listQuestions = await axios.get(
      "http://localhost:8080/listquestion/1"
    );

    const foundListQuestion = listQuestions.data.filter(
      (listQuestion: any) => listQuestion.id == listquestionId
    );

    return foundListQuestion[0].questionNumber;
  } catch (error: any) {
    throw new Error(error);
  }
}
