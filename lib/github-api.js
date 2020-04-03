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
module.exports.get_repos_langues = (lang_urls = []) => {
  const list_of_languages = [];
  lang_urls.forEach((lan) => {
    return fetch(lan)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .then((list_lang) => list_of_languages.push(...list_lang))
      .catch((err) => console.log(err));
  });
  return list_of_languages;
};

module.exports.iterate_repos = (list = []) => {
  return Promise.resolve(list.map((repo) => repo.languages_url));
};
