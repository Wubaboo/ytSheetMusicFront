const baseURL = process.env.REACT_APP_BACKEND_URL;
async function getMain(url) {
  const res = await fetch(baseURL);
  const data = await res.text();
  console.log("result", data);
  return data;
}

async function postToMain(url, hands, threshold) {
  if (!url) {
    return;
  }
  let body = {
    threshold: JSON.stringify(threshold / 100),
    hands: hands,
    url: url,
  };

  let requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  console.log(baseURL, requestOptions);
  const response = await fetch(baseURL, requestOptions);
  const result = await response.text();
  return result;
}

const methods = { postToMain, getMain };
export default methods;
