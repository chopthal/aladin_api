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
const resultTable = document.querySelector(".result-table");

searchButton.addEventListener("click", async () => {
  const items = await getResult();
  renderItems(items);
});

function getResult() {
  query = searchInput.value;
  const url = `http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${key}&Query=${query}&QueryType=${queryType}&MaxResults=${maxResults}&start=${start}&SearchTarget=${searchTarget}&output=${output}&Version=${version}`;
  const items = fetch(url)
    .then((res) => res.json())
    .then((res) => {
      return res.item;
    });
  return items;
}

function renderItems(items) {
  let html = `<tr>
    <th>제목</th>
    <th>저자</th>
    <th>ISBN</th>
  </tr>`;

  items.forEach((item) => {
    const tmp = `<tr>
    <td>${item.title}</td>
    <td>${item.author}</td>
    <td>${item.isbn13}</td>
    <td><button>추가</button></td>
  </tr>`;
    html = html + tmp;
  });

  resultTable.innerHTML = html;
}
