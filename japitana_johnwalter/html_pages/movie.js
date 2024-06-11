const container = document.querySelector("#container");
const inputId = document.querySelector("#movie_id");
const inputName = document.querySelector("#movie_name");
const inputSummary = document.querySelector("#movie_summary");
const inputGenre = document.querySelector("#movie_genre");
const inputDirector = document.querySelector("#movie_director");
const inputDate = document.querySelector("#movie_date");

const endpoint = "https://www.seer-ag.site/api/ex16_movies.php";

async function getData() {
  const response = await fetch(endpoint);
  const data = await response.json();

  container.innerHTML = "";

  for (const item of data) {
    const row = document.createElement("tr");
    const editButton = getEditButton(item);
    const deleteButton = getDeleteButton(item);

    row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.movie_name}</td>
            <td>${item.movie_summary}</td>
            <td>${item.movie_genre}</td>
            <td>${item.movie_director}</td>
            <td>${item.movie_date}</td>`;

    row.append(editButton);
    row.append(deleteButton);
    container.append(row);
  }

  setInputs();
}

async function insertCar() {
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
    body: `movie_name=${inputName.value}&\
            movie_summary=${inputSummary.value}&\
            movie_genre=${inputGenre.value}&\
            movie_director=${inputDirector.value}&\
            movie_date=${inputDate.value}`,
  };

  const response = await fetch(endpoint, options);
  const data = await response.text();

  getData();
}

async function updateData() {
  const options = {
    method: "PATCH",
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
    body: `id=${inputId.value}&\
            movie_name=${inputName.value}&\
            movie_summary=${inputSummary.value}&\
            movie_genre=${inputGenre.value}&\
            movie_director=${inputDirector.value}&\
            movie_date=${inputDate.value}`,
  };

  const response = await fetch(endpoint, options);
  const data = await response.text();

  deleteData();
}

async function deleteData(id) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
    body: `id=${id}`,
  };

  const response = await fetch(endpoint, options);
  const data = await response.text();

  deleteData();
}

function getDeleteButton(item) {
  const cell = document.createElement("td");
  const button = document.createElement("button");

  button.addEventListener("click", deleteData.bind(null, item.id));

  button.textContent = "Delete";
  cell.append(button);
  return cell;
}

function getEditButton(item) {
  const cell = document.createElement("td");
  const button = document.createElement("button");

  button.addEventListener(
    "click",
    setInputs.bind(
      null,
      item.id,
      item.movie_name,
      item.movie_summary,
      item.movie_genre,
      item.movie_director,
      item.movie_date
    )
  );

  button.textContent = "Edit";
  cell.append(button);

  return cell;
}

function setInputs(id, name, summary, genre, director, release_date) {
  inputId.value = id ?? "";
  inputName.value = name ?? "";
  inputSummary.value = summary ?? "";
  inputGenre.value = genre ?? "";
  inputDirector.value = director ?? "";
  inputDate.value = release_date ?? "";
}

deleteData();