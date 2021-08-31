export const getAptitudeQuestions = (): Promise<any> => {
  const headers = { "Content-Type": "application/json" };

  return fetch("https://localhost:44349/api/zealiAptitudeTest/ZealiAptitude", {
    headers,
  }).then((response) => {
    if (response) {
      return response.json();
    }
  });
};

export const evaluateAnswers = (aptitudeQuestions: any): Promise<any> => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ aptitudeQuestions }),
  };
  return fetch(
    "https://localhost:44349/api/zealiAptitudeTest/ZealiAptitude",
    requestOptions
  ).then((response) => {
    if (response) {
      return response.json();
    }
  });
};
