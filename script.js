let title = document.getElementById("title");
let content = document.getElementById("content");
let btn = document.getElementById("btn");
let list = document.getElementById("list");

btn.addEventListener("click", news);

function news() {
    list.innerHTML = list.innerHTML + `
        <div class="news">
            <h2>${title.value}</h2>
            <p>${content.value}</p><hr>
        </div>
    `;
}