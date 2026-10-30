function showSection(sectionId) {

    document.getElementById(sectionId)
        .scrollIntoView({
            behavior: "smooth"
        });
}


function submitLost(event) {

    event.preventDefault();

    let name =
        document.getElementById("lostName").value;

    let location =
        document.getElementById("lostLocation").value;

    let date =
        document.getElementById("lostDate").value;

    let description =
        document.getElementById("lostDescription").value;


    let status = document.getElementById("lostStatus");
    let image = getSelectedImage("lostImage", status);

    if (name.trim() === "" || location.trim() === "") {
        status.textContent = "Please add the item name and last seen location.";
        status.className = "form-status error";
        return;
    }

    if (document.getElementById("lostImage").files[0] && !image) {
        return;
    }

    status.innerHTML = `
        <span class="success-icon" aria-hidden="true">✓</span>
        <div>
            <strong>Lost report submitted!</strong>
            <p>Your details are ready to help your item find its way home.</p>
            <a href="index.html#search">Browse possible matches</a>
            <button type="button" onclick="resetReport('lostReportForm', 'lostStatus')">Submit another report</button>
        </div>
    `;
    status.className = "form-status success";
    event.currentTarget.classList.add("submitted");

    console.log({
        type: "Lost",
        name: name,
        location: location,
        date: date,
        description: description,
        image: image ? image.name : "No image attached"
    });
}


function submitFound(event) {

    event.preventDefault();

    let name =
        document.getElementById("foundName").value;

    let location =
        document.getElementById("foundLocation").value;

    let date =
        document.getElementById("foundDate").value;

    let description =
        document.getElementById("foundDescription").value;


    let status = document.getElementById("foundStatus");
    let image = getSelectedImage("foundImage", status);

    if (name.trim() === "" || location.trim() === "") {
        status.textContent = "Please add the item name and found location.";
        status.className = "form-status error";
        return;
    }

    if (document.getElementById("foundImage").files[0] && !image) {
        return;
    }

    status.innerHTML = `
        <span class="success-icon" aria-hidden="true">✓</span>
        <div>
            <strong>Found report submitted!</strong>
            <p>Thanks for helping a fellow student reconnect with their item.</p>
            <a href="index.html#search">See recent reports</a>
            <button type="button" onclick="resetReport('foundReportForm', 'foundStatus')">Submit another report</button>
        </div>
    `;
    status.className = "form-status success";
    event.currentTarget.classList.add("submitted");

    console.log({
        type: "Found",
        name: name,
        location: location,
        date: date,
        description: description,
        image: image ? image.name : "No image attached"
    });
}


function searchItem() {

    let search = document.getElementById("searchInput").value.trim().toLowerCase();


    let results =
        document.getElementById("results");


    let items = [

        {
            name: "Black Wireless Earbuds",
            location: "Library",
            date: "10 September",
            type: "Found",
            description: "Small black earbuds in a charging case.",
            category: "Electronics"
        },

        {
            name: "Blue Water Bottle",
            location: "Block 32",
            date: "9 September",
            type: "Found",
            description: "Reusable blue bottle with a silver lid.",
            category: "Personal items"
        },

        {
            name: "Engineering Notebook",
            location: "Academic Block",
            date: "10 September",
            type: "Found",
            description: "Spiral notebook with engineering sketches inside.",
            category: "Study materials"
        }

    ];


    let filtered = items.filter(item =>
        `${item.name} ${item.location} ${item.type} ${item.description} ${item.category}`
            .toLowerCase()
            .includes(search)
    );


    results.innerHTML = `<p class="result-summary">${filtered.length} ${filtered.length === 1 ? "item" : "items"} found</p>`;


    filtered.forEach(item => {

        results.innerHTML += `

            <div class="result-card">

                <div class="result-card-heading">
                    <div>
                        <span class="result-category">${item.category}</span>
                        <h3>${item.name}</h3>
                    </div>
                    <span class="status-pill">${item.type}</span>
                </div>

                <p>📍 ${item.location}</p>

                <p>📅 ${item.date}</p>

                <p class="result-description">${item.description}</p>

                <button
                onclick="alert('Verification request sent!')">

                View Possible Match

                </button>

            </div>

        `;

    });


    if (filtered.length === 0) {
        results.innerHTML =
            "<p class=\"empty-state\"><strong>No matching items yet.</strong><br>Try a location, color, category, or simpler item name.</p>";

    }
}


document.getElementById("searchInput")?.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        searchItem();
    }
});


function getSelectedImage(inputId, status) {

    let input = document.getElementById(inputId);
    let file = input && input.files[0];

    if (file && file.size > 5 * 1024 * 1024) {
        status.textContent = "Please choose an image smaller than 5 MB.";
        status.className = "form-status error";
        return null;
    }

    return file;
}


function resetReport(formId, statusId) {

    let form = document.getElementById(formId);
    let status = document.getElementById(statusId);

    form.reset();
    form.classList.remove("submitted");
    status.className = "form-status";
    status.innerHTML = "";
}


const defaultUniversity = "Lovely Professional University";


function getUniversity() {
    return localStorage.getItem("campusfindUniversity") || defaultUniversity;
}


function applyUniversity(university) {
    let selectedUniversity = university.trim() || defaultUniversity;

    document.querySelectorAll("[data-university-name]").forEach(element => {
        element.textContent = selectedUniversity;
    });

    document.querySelectorAll("#universityName, #contactUniversityName").forEach(input => {
        input.value = selectedUniversity;
    });
}


function saveUniversity(event) {
    event.preventDefault();

    let input = event.currentTarget.querySelector("input");
    let university = input.value.trim();

    if (!university) {
        input.focus();
        return;
    }

    localStorage.setItem("campusfindUniversity", university);
    applyUniversity(university);
}


document.addEventListener("DOMContentLoaded", () => {
    applyUniversity(getUniversity());
});