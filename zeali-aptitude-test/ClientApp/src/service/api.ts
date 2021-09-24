export const post = async (path: string, data: any) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return await fetch(path, requestOptions).then((response) => response.json());
};

export const get = async (path: string): Promise<any> => {
  const headers = { "Content-Type": "application/json" };

  return await fetch(path, {
    headers,
  }).then((response) => {
    if (response) {
      return response.json();
    }
  });
};
