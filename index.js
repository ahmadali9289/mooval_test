const express = require("express");
const app = express();
const fetch = require("node-fetch");

const github_api = require("./lib/github-api");

app.get("/", (req, res, next) => {
  // Just for Testing purpose
  //   const username = "abcxyz";
  //   const programming_lang = "JavaScript";
  //   const fallback_lang = "CSS, JavaScript";

  const username = req.param("username");
  const programming_lang = req.param("programming_lang");
  const fallback_lang = req.param("fallback_lang");

  github_api
    .request_github_api(username)
    .then((user) => {
      if (!user) {
        res.send("No User with the username exists");
      }
      return user;
    })
    .then((user) => {
      return github_api(user.repos_url);
    });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
