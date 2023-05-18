import axios from "axios"

export default async function getListOfQuestion() {
 try {
  const listSetQuestions = await axios.get(
    `http://localhost:8080/listquestion/1`
  );

  const safeListSetQuestions = listSetQuestions.data.map((setQuestion: any) => ({
   ...setQuestion,
  }))
  
  return safeListSetQuestions;

 } catch (error: any) {
  throw new Error(error)
 }
}