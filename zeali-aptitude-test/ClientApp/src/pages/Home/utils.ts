export const getAptitudeQuestions = (): Promise<any> => {
  const headers = { "Content-Type": "application/json" };

return fetch('/api/zealiAptitudeTest/ZealiAptitude', {
    headers,
  }).then((response) => {
    if (response) {
      return response.json();
    }
  });
};

