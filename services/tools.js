const domain = process.env.CUSTOM_DOMAIN + "/api";

export const getHTTPFormat = async ({ url }) => {
  const res = await fetch(`/api${url}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const result = await res.json();
  return result;
};

export const postHTTPFormat = async ({ url, newData }) => {
  const res = await fetch(`/api${url}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  const result = await res.json();
  return result;
};

export const updateHTTPFormat = async ({ url, newData }) => {
  const res = await fetch(`/api${url}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  const result = await res.json();
  return result;
};

export const deleteHTTPFormat = async ({ url }) => {
  const res = await fetch(`/api${url}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const result = await res.json();
  return result;
};
export const timeFormatter = (time) => {
  return time > 0
    ? ` ${parseInt(time / 60)
        .toString()
        .padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}`
    : " 00:00";
};