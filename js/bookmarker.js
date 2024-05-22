var bookmarkName = document.getElementById("bookmarkName");
var bookmarkURL = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");

var tableContent = document.getElementById("tableContent");
var bookmarks = [];

var deleteButtons;
if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    for (var i = 0; i < bookmarks.length; i++) {
        displayBookmark(i);
    }
}


submitBtn.addEventListener("click", function () {
    if (bookmarkName.classList.contains("is-valid") && bookmarkURL.classList.contains("is-valid")) {
        var bookmark = {
            name: bookmarkName.value,
            url: bookmarkURL.value
        }
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        displayBookmark(bookmarks.length - 1);
        bookmarkName.classList.remove("is-valid");
        bookmarkURL.classList.remove("is-valid");
        clearInput();
    }
});

function displayBookmark(index) {
    var newBookmark = `
    <tr>
        <td>${index + 1}</td>
        <td>${bookmarks[index].name}</td>
        <td>
        <a href="${bookmarks[index].url}" class="btn btn-visit" target="_blank"> Visit</a>
        </td>
        <td>
            <button class="btn btn-delete" data-index="${index}">
                <i class="fa-solid fa-trash-can"></i>
                Delete
            </button>
        </td>
    </tr>
    `;
    tableContent.innerHTML += newBookmark;

    assignEventHandler();
}

function clearInput() {
    bookmarkName.value = "";
    bookmarkURL.value = "";
}

var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

bookmarkName.addEventListener("input", function () {
    validate(bookmarkName, nameRegex);
});

bookmarkURL.addEventListener("input", function () {
    validate(bookmarkURL, urlRegex);
});


function validate(element, regex) {
    var testRegex = regex;
    if (testRegex.test(element.value)) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
    } else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
    }
}


function assignEventHandler() {
    deleteButtons = document.querySelectorAll(".btn-delete");
    if (deleteButtons) {
        for (var i = 0; i < deleteButtons.length; i++) {
            deleteButtons[i].addEventListener("click", function (e) {
                deleteBookmark(e);
            });
        }
    }
}

assignEventHandler();

function deleteBookmark(e) {
    console.log(e.target.dataset.index);
    var deletedIndex = e.target.dataset.index;
    bookmarks.splice(deletedIndex, 1);
    tableContent.innerHTML = "";
    for (var i = 0; i < bookmarks.length; i++) {
        displayBookmark(i);
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}