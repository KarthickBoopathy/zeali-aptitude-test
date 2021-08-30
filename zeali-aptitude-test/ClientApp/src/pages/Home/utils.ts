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
