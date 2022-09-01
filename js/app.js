const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};

const displayPhones = (phones, dataLimit) => {
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.textContent = ``;
  // display 9 phone only
  const showMore = document.getElementById("show-more");
  if (phones.length > 9 && dataLimit) {
    phones = phones.slice(0, 9);
    showMore.classList.remove("d-none");
  } else {
    showMore.classList.add("d-none");
  }
  // diaplay no phone found
  const notFoundMsg = document.getElementById("not-found-msg");
  if (phones.length > 0) {
    notFoundMsg.classList.add("d-none");
  } else {
    notFoundMsg.classList.remove("d-none");
  }
  // display all phones
  phones.forEach((phone) => {
    // console.log(phone);
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
        <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                 <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">This is a longer card with
                    supporting text below.</p>
                  <button onclick="loadMoreDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#showDetailsModal">Show Details</button>
            </div>
        </div>
        `;
    phonesContainer.appendChild(phoneDiv);
  });
  toggleSpinner(false);
};

const processSearch = (dataLimit) => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhones(searchText, dataLimit);
  toggleSpinner(true);
};

// search button
document.getElementById("btn-search").addEventListener("click", function () {
  processSearch(9);
});
// enter key event handler
document
  .getElementById("search-field")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      processSearch(9);
    }
  });
// show more button
document.getElementById("btn-show-more").addEventListener("click", function () {
  processSearch();
});

// spinner
const toggleSpinner = (isLoading) => {
  const spinner = document.getElementById("spinner");
  if (isLoading) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};

// load more details function
const loadMoreDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  diaplayPhoneDetails(data.data);
};

// display more details with modal
const diaplayPhoneDetails = (phone) => {
  // console.log(phone);
  const modalTitle = document.getElementById("phoneDetailModalLabel");
  modalTitle.innerText = `${phone.name}`;
  const phoneDetail = document.getElementById("phoneDetail");
  phoneDetail.innerHTML = `
    <p>Release Date: ${
      phone.releaseDate ? phone.releaseDate : "No Release Date Found"
    }</p>
    <p>Chipset: ${
      phone.mainFeatures?.chipSet
        ? phone.mainFeatures.chipSet
        : "No chipset details found"
    } </p>
    <p>Memory: ${
      phone.mainFeatures?.memory
        ? phone.mainFeatures.memory
        : "No memory details found"
    } </p>
  `;
};
