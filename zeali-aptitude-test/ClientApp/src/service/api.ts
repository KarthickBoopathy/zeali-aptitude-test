const BASE_API = "/api/zealiAptitudeTest";

export const post = async (path: string, data: any): Promise<any> => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return await fetch(`${BASE_API}${path}`, requestOptions).then((response) =>
    response.json()
  );
};

export const get = async (path: string): Promise<any> => {
  const headers = { "Content-Type": "application/json" };

  return await fetch(`${BASE_API}${path}`, {
    headers,
  }).then((response) => {
    if (response) {
      return response.json();
    }
  });
};
