import axios from "axios";

interface IParams {
  listquestionId?: string;
}

export default async function getAllQuestionInListById(params: IParams) {
  try {
    const { listquestionId } = params;
    const allQuestionsInList = await axios.get(
      `http://localhost:8080/question/${listquestionId}`
    );
    return allQuestionsInList.data;
  } catch (error: any) {
    throw new Error(error);
  }
}
