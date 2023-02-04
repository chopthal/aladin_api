let key = "ttbscd12027001";
let query = "aladdin";
let queryType = "Keyword"; // Title, Author, Publisher
let maxResults = "10";
let start = "1";
let searchTarget = "Book"; // Book Foreign Music DVD Used eBook All
let output = "js"; // xml
let version = "20131101";

const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");

searchButton.addEventListener("click", () => {
  query = searchInput.value;
  const url = `http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${key}&Query=${query}&QueryType=${queryType}&MaxResults=${maxResults}&start=${start}&SearchTarget=${searchTarget}&output=${output}&Version=${version}`;
  fetch(url)
    .then((res) => console.log(res.json()))
    .catch((error) => {
      console.log(error);
    });
});
