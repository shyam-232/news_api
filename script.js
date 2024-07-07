const apiKey = "445a3c153db345148c5cbf81dddfd7d1";

const blogContainer = document.getElementById("blog-container");

const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=50&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    return data.articles;
  } catch (error) {
    console.error("Error in fetching random News", error);
    return [];
  }
}

searchButton.addEventListener("click", async () => {
  const query = searchField.value.trim();
  if (query !== "") {
    try {
      const articles = await fetchNewsQuery(query);
      displayBlog(articles);
    } catch (error) {
      console.log("Error in fetching search by query", error);
    }
  }
});

async function fetchNewsQuery(query) {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=50&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    return data.articles;
  } catch (error) {
    console.error("Error in fetching random News", error);
    return [];
  }
}

function displayBlog(articles) {
  blogContainer.innerHTML = "";
  articles.forEach((article) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");
    const img = document.createElement("img");
    img.src = article.urlToImage;
    img.alt = article.title;
    const title = document.createElement("h2");
    title.textContent = article.title;
    const description = document.createElement("p");
    description.textContent = article.description;

    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogCard.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });
    blogContainer.appendChild(blogCard);
  });
}
(async () => {
  try {
    const articles = await fetchRandomNews();
    // console.log(articles);
    displayBlog(articles);
  } catch (error) {
    console.error("Error in fetching random News", error);
  }
})();
