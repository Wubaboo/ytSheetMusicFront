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

async function combineSelected(bucket, data) {
  if (!bucket) {
    return;
  }
  let body = {
    data: JSON.stringify(data),
  };
  let requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  const response = await fetch(`${baseURL}${bucket}`, requestOptions);
  const result = await response.text();
  return result;
}

async function getImages(bucket) {
  if (!bucket) {
    return [];
  }
  const requestOptions = {
    method: "GET",
  };
  const response = await fetch(`${baseURL}${bucket}`, requestOptions);
  const result = await response.text();
  return result;
}

function getImageLink(bucket, file) {
  return `https://ytsheetmusic.s3.ca-central-1.amazonaws.com/${bucket}/${file}`;
}

function getPDFLink(bucket) {
  return `https://ytsheetmusic.s3.ca-central-1.amazonaws.com/${bucket}/${bucket}.pdf`;
}

const methods = {
  postToMain,
  getMain,
  getImages,
  getImageLink,
  getPDFLink,
  combineSelected,
};
export default methods;
