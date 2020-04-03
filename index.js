const express = require("express");
const app = express();

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
      return github_api.get_github_public_repos(user.repos_url);
    })
    .then((repos) => {
      return github_api.iterate_repos(repos);
    })
    .then((lang_urls) => {
      return github_api.get_repos_langues(lang_urls);
    })
    .then((list_of_lang_user) => {
      if (list_of_lang_user.length == 0) {
        return github_api.use_fallback(fallback_lang);
      }
      return github_api.compare_languages(fallback_lang);
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.send("Error Occured" + err));
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
