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
const wishTable = document.querySelector(".wish-table");

renderWishes();

async function addButtonOnclick(title, author, isbn13) {
  let wishes = await getWish();
  const newWish = {
    title: title,
    author: author,
    isbn13: isbn13,
  };

  wishes = [newWish, ...wishes];
  // save json file
}

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
    <td><button class='add-button' id=${item.isbn13} 
    onclick='addButtonOnclick(
      "${item.title}", "${item.author}", "${item.isbn13}")
      '>추가</button></td>
  </tr>`;
    html = html + tmp;
  });

  resultTable.innerHTML = html;
}

async function renderWishes() {
  const wishes = await getWish();
  let html = `<tr>
    <th>순번</th>
    <th>제목</th>
    <th>저자</th>
    <th>ISBN</th>
  </tr>`;

  wishes.forEach((wish, idx) => {
    const tmp = `<tr>
    <td>${idx + 1}</td>
    <td>${wish.title}</td>
    <td>${wish.author}</td>
    <td>${wish.isbn13}</td>
    <td><button>제거</button></td>
  </tr>`;
    html = html + tmp;
  });

  wishTable.innerHTML = html;
}

function getWish() {
  const wishes = fetch("./data.json")
    .then((res) => res.json())
    .then((res) => {
      return res;
    });
  return wishes;
}
