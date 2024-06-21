const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getToken = async () => {
    await delay(100);
  let root = localStorage.getItem("persist:root");
  if (!root) return null;
  return JSON.parse(JSON.parse(root).auth).token;
};

export const purgePersist = () => {
  localStorage.removeItem("persist:root");
};
