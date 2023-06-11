const userList = document.getElementById('userList');
const buttonPrev = document.getElementById('button__prev');
const buttonNext = document.getElementById('button__next');

let pageNumber = 1;
let pageTotal = 1;

getUsersFromApi();
buttonNext.addEventListener("click", function () {
    if (pageTotal > pageNumber) {
        console.log(buttonNext);
        pageNumber++;
        userList.innerHTML = '';
        getUsersFromApi();
    }
})
buttonPrev.addEventListener("click", function () {
    if (pageNumber > 1) {
        pageNumber--;
        userList.innerHTML = '';
        getUsersFromApi();
    }
})

function getUsersFromApi() {
    let xhr = new XMLHttpRequest();
    xhr.open('get', `https://reqres.in/api/users?page=${pageNumber}`);
    xhr.responseType = 'json';
    xhr.onload = function () {
        pageTotal = xhr.response.total_pages;
        xhr.response.data.map(function (user) {
            userList.innerHTML += `
                <li>
                <span class="first__name">${user.first_name}<br></span>
                <span class="last__name"> ${user.last_name}<br></span>
                <a href="mailto:${user.email}" class="email">${user.email}<br></a>
                <span class="img"><img src="${user.avatar}" alt=""></span>                 
                </li>`
        })
    };

    xhr.onerror = function () {
        alert(`Network Error`);
    };
    xhr.send();
}

const formNewUsers = document.getElementById('formNewUser');
const firstName = document.getElementById('first_name');
const lastName = document.getElementById('last_name');
const email = document.getElementById('email');
const job = document.getElementById('job');
const newUserList = document.getElementById('newUserList');


formNewUsers.addEventListener("submit", function (ev) {
    ev.preventDefault();
    let xhr = new XMLHttpRequest();
    let json = JSON.stringify({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        job: job.value,
    });
    xhr.open('post', `https://reqres.in/api/users`);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.responseType = 'json';
    xhr.onload = function () {
        newUserList.innerHTML += `
                <li>
                <span class="first__name">${xhr.response.firstName}<br></span>
                <span class="last__name"> ${xhr.response.lastName}<br></span>
                <a href="mailto:${xhr.response.email}" class="email">${xhr.response.email}<br></a>
                <span class="job"> ${xhr.response.job}<br></span>               
                </li>`
    };
    xhr.onerror = function () {
        alert(`Network Error`);
    };
    xhr.send(json);
})