import * as express from "express";
import * as url from "url";

const app = express();

app.get("/hello", (request, response) => {
  const getParams = url.parse(request.url, true).query;

  if (Object.keys(getParams).length == 0) {
    response.end("Hello all");
  } else {
    response.end("Hello " + getParams.name);
  }
});

app.listen(3000);
