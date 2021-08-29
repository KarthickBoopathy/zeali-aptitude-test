import { useState } from "react";
import { get } from "./api";


export function getAptitudeQuestions()
{

  var questiondata;

  const headers = { 'Content-Type': 'application/json' }
 return  fetch('https://localhost:44349/api/zealiAptitudeTest/ZealiAptitude', { headers })
    .then(response => response.json())
    .then(data =>
    {
      return data;
      
    }
     
  );



  // const data = [
  //   {
  // answer: "A",
  // id: "612b6fc6cbc3884ed4a47079",
  // optionA: "26",
  // optionB: "27",
  // optionC: "28",
  // optionD: "29",
  // question: "Which HTML tag do we use to put the JavaScript?",
  // questionID: "1",
  // userAnswer: "",
  //   },
  //   {
  //     questionID: "1001",
  //     question: "Which HTML tag do we use to put the DotNet?",
  //     optionA: "Yes",
  //     optionB: "No",
  //     optionC: "Ama",
  //     optionD: "illai",
  //     answer: "A",
  //     userAnswer: ""
  //   },  

  // ]

  //  return data;


 
}
