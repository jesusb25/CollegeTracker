const API_URL = "/api";


/* Subclass of Error for representing HTTP errors returned from the API.
   Exposes a status (the HTTP response status code) and message (a user-facing message).

   Example usage:
      throw new HTTPError(500, "This feature is not implemented"); */
export class HTTPError extends Error {
  /* status is the HTTP status, message is a user-facing error message. */
  constructor(status, message) {
    /* Call the Error constructor with the given message. */
    super(message);
    this.status = status;
  }
}

/* Make an API request.
   - method is the HTTP method.
   - path is the URI. It must begin with a /. Does not include API_URL.
   - body (optional) is the request body as a JS object that can be converted to JSON.

   The API is assumed to return JSON. If the response status is 200, the response body (as a JS object) is returned.
   If the response has any other status, an HTTPError is thrown, with its status set to the response status and its
   message set to the value of the `error` property of the response, which we assume is a user-facing error message. */
const apiRequest = async (method, path, body = null) => {
  // make url for path request
  const url = API_URL + path;

  // make request
  // try request
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: body !== null ? JSON.stringify(body) : null
  });
  if (response.status === 200) {
    // return json body
    return await response.json();
  } else {
    throw new HTTPError(response.status, (await response.json()).error);
  }
};

export default apiRequest;
