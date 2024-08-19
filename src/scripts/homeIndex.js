// const URI = "http://localhost:3001";
const URI = "https://belairstrongtowns.org";

function showError(text) {
  const errorArea = document.getElementById("error");
  if (!errorArea) return;
  errorArea.innerText = text;
  errorArea.classList.remove("invisible");
}

function subscribe(e) {
  e.preventDefault();
  const email = document.getElementById("email");
  if (!email || !email.value) return;
  fetch(`${URI}/subscribe`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
    }),
  })
    .then((res) => {
      res.json().then((body) => {
        console.log(body);
        if (res.status === 400) {
          if (body.response === "REDUNDANT_EMAIL") {
            showError("You're already registered; we'll send your verification email as soon as we can! Check your spam.");
          } else {
            showError("Please enter a valid email address.");
          }
          return;
        }

        if (res.status !== 200) {
          showError("Something went wrong. Please try later.");
          return;
        }

        window.location.href = `${URI}/welcome`;
      });
    })
    .catch((err) => console.error(err));
}

const form = document.querySelector("form");
form.addEventListener("submit", (e) => subscribe(e));
