/* Global Variables */
const input = document.getElementById('zip');
const value =input.value ;
const ApiKey = "d1951fcb3b19365992c43bd00b120f69";
const BaseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const ZipEl = document.getElementById("zip");
const feelingsEl = document.getElementById("feelings");
const generateEl = document.getElementById("generate");
const dateEl = document.getElementById("date");
const tempEl = document.getElementById("temp");
const contentEl = document.getElementById("content");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

generateEl.addEventListener("click", () => {
  getTemp(BaseUrl, ZipEl.value, ApiKey)
    .then((data) =>
      sendData({
        date: newDate,
        temp: data.main,
        feeling: feelingsEl.value,
      })
    )
    .then((data) => {
      console.log(data);
      updateUi();
    });
});

/* Function to GET Web API Data*/
async function getTemp(baseURL, zipCode, apiKey) {
  const makeRequest = await fetch(`${baseURL}${zipCode}&appid=${apiKey}&units=metric`);
  try {
    const response = await makeRequest.json();
    console.log(response)
    return response;
  } catch (error) {
    console.log(error.message);
  }
}

/* Function to send Data*/
async function sendData(data = {}) {
  const makeRequest = await fetch("/sendData", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Conten-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const response = await makeRequest.json();
    console.log(data)
    return response;
  } catch (error) {
    console.log(error.message);
  }
}

// update ui
async function updateUi() {
  const makeRequest = await fetch("getData");
  try {
    const response = await makeRequest.json();
    dateEl.innerHTML = `ToDay is ${response.date}`;
    tempEl.innerHTML = `today is temperature is ${response.temp}`;
    contentEl.innerHTML = `I am feeling ${response.feeling}`;
  } catch (error) {
    console.log(error.message);
  }
}
