const fetch = require("node-fetch");

module.exports.request_github_api = (username) => {
  return fetch(`https://api.github.com/users/${username}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => console.log(err));
};

module.exports.get_github_public_repos = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => console.log(err));
};
