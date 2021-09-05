const weatherForm = document.querySelector("form");
const search1 = document.querySelector("#from");
const search2 = document.querySelector("#to");
const meassageOne = document.querySelector("#message-1");
const meassageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const from = search1.value;
  const to = search2.value;

  meassageOne.textContent = "loading";
  meassageTwo.textContent = "";

  fetch(`/distance?from=${from}&to=${to}`).then((response) => {
    response.json().then((data) => {
      console.log(data.body.body.body.route.distance);
      if (data.error) {
        meassageOne.textContent = data.error;
      } else {
        meassageOne.textContent = `Distance between ${from} to ${to} ${data.body.body.body.route.distance}`;
        meassageTwo.textContent = `is and time will take to travel is ${data.body.body.body.route.formattedTime}`;
      }
    });
  });
});
