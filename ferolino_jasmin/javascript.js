const USERID = {
  name: null,
  message: null,
  date: null,
};

const userComment = document.querySelector(".usercomment");
const publishBtn = document.querySelector("#button_01");
const comments = document.querySelector(".comment-area");
const userName = document.querySelector(".user");
const sortDropdown = document.querySelector("#sortDropdown");

const commentsArray = [
    {
		name: "akisha",
		message: "Hope you'll get it by!",
		date: new Date("May 7, 2024 22:28:24 2024")
	},
    {
		name: "walter",
		message: "Believe it!",
		date: new Date("May 7, 2024 10:28:24 2024")
	},
    {
		name: "james",
		message: "Nice Goal!",
		date: new Date("May 7, 2024 13:28:24 2024")
	},
];

userComment.addEventListener("input", (e) => {
  if (!userComment.value) {
    publishBtn.setAttribute("disabled", "disabled");
    publishBtn.classList.remove("abled");
  } else {
    publishBtn.removeAttribute("disabled");
    publishBtn.classList.add("abled");
  }
});

function addPost() {
  if (!userComment.value) return;

  const comment = {
    name: userName.value,
    message: userComment.value,
    date: new Date().toISOString(),
  };

  commentsArray.push(comment);
  renderComments();

  userComment.value = "";
  publishBtn.classList.remove("abled");
}

publishBtn.addEventListener("click", addPost);

function renderComments() {
  comments.innerHTML = "";

  const sortValue = sortDropdown.value;
  if (sortValue === "date-asc") {
    commentsArray.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (sortValue === "date-desc") {
    commentsArray.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  commentsArray.forEach((comment) => {
    let published = `
        <div>
            <center>${new Date(comment.date).toDateString()}</center>
            <p>${comment.name}: "${comment.message}"</p>
            <hr>
        </div>
        `;
    comments.innerHTML += published;
  });
}

sortDropdown.addEventListener("change", renderComments);
renderComments();
async function searchCountry() {
  const country_input = document.getElementById('country_input').value;
  try {
      const res = await fetch(
          `https://restcountries.com/v3.1/name/${country_input}`);
      if (!res.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await res.json();
      if (data && data.length) {
          const country = data[0];
          const details = document.getElementById('countryDetails');
          details.innerHTML = `<h2>${country.name.common}</h2>
                               <p>Region: ${country.region}</p>
                               <p>Capital: ${country.capital ? 
                                  country.capital.join(', ') : 'N/A'}</p>
                               <p>Population: ${country.population}</p>
                               <p>Area: ${country.area} sq km</p>
                               <p>Language: ${country.languages ? 
                                  Object.values(country.languages).join(', ')
                                      : 'N/A'}</p>`;

          const regionRes = await fetch(
              `https://restcountries.com/v3.1/region/${country.region}`);
          if (!regionRes.ok) {
              throw new Error('Network response was not ok');
          }
          const regionData = await regionRes.json();

          const region = document.getElementById('countriesInRegion');
          region.innerHTML = '<h2>Other Countries in the Same Region</h2>';
          regionData.forEach(function(c) {
              if (c && c.name && c.name.common !== country.name.common) {
                  region.innerHTML += `<p>${c.name.common}</p>`;
              }
          });
      } else {
          alert('Country not found. Please enter a valid country name.');
      }
  } catch (error) {
      console.error('Error fetching data:', error);
      alert('An error occurred. Please try again later.');
  }
}
