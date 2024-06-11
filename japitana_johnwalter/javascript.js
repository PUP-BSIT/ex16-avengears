const USERID = {
  name: null,
  message: null,
  date: null,
};

const userComment = document.querySelector(".user-comment");
const publishBtn = document.querySelector("#button_01");
const comments = document.querySelector(".comment-area");
const userName = document.querySelector(".user");
const sortDropdown = document.querySelector("#sortDropdown");

const commentsArray = [
    {
		name: "james",
		message: "Hope your dreams come true!",
		date: new Date("May 5, 2024 22:28:24 2024")
	},
    {
		name: "jasmin",
		message: "Goodluck to you're journey",
		date: new Date("May 5, 2024 10:28:24 2024")
	},
    {
		name: "akisha",
		message: "Hope you'll get it!",
		date: new Date("May 5, 2024 13:28:24 2024")
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
renderComments()