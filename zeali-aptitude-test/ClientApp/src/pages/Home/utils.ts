import { get } from "./api";


export function getAptitudeQuestion()
{
  // get("https://localhost:44349/WeatherForecast").then((data: any) =>
  // {
  //   console.log("machannnn", data);
  //   return data;
  // });

  const data = [
    {
      questionID: "1000",
      question: "Which HTML tag do we use to put the JavaScript?",
      optionA: "26",
      optionB: "27",
      optionC: "28",
      optionD: "29",
      answer: "A",
      userAnswer: ""
    },
    {
      questionID: "1001",
      question: "Which HTML tag do we use to put the DotNet?",
      optionA: "Yes",
      optionB: "No",
      optionC: "Ama",
      optionD: "illai",
      answer: "A",
      userAnswer: ""
    },  

  ]

  return data;


 
}
