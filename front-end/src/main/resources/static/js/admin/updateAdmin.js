const thisForm  = document.getElementById('registerForm');
const mail      = document.getElementById('mail');
const password  = document.getElementById('password')
const password2 = document.getElementById('confirm_password');
const userrole  = document.getElementById('role');
const id        = document.getElementById('id');

let thePath = window.location.pathname;
const urlId = thePath.substring(thePath.lastIndexOf('/')+1)
const GetUserUrl = `http://localhost:5002/select/user/${urlId}`;
// const mail = "kim@i-tritraening.dk";

// ======== INITIALIZE PAGE DATA ===========
initPageData().then(data =>{

    insertPageData(data);
})
// ======== GET PAGE DATA ===========
function initPageData() {
    const requestOptions = {
        'content-type': 'application/json',
        method: 'GET',
        redirect: 'follow'
    };

    return fetch(GetUserUrl, requestOptions)
        .then(response => response.json())
        .then((responseData) => {
            // console.log(responseData);
            return responseData;
        })
        .catch(error => console.warn(error));
}


function insertPageData(data){
    mail.value = data.mail;
    id.value = data.id;
}
// ============== GET BLOG ==============

thisForm.addEventListener('submit',async function (e) {
    e.preventDefault();

    await updateUser();

})


async function updateUser() {

    const urlUpdateUser = `http://localhost:5002/edit/user`;

    let init = {
        method: 'PUT',
        body: JSON.stringify({
            'id'        : id.value,
            'mail'      : mail.value,
            'password'  : password.value,
            'enabled'   : 1
        }),
        headers: {
            'Content-type': 'application/json'
        }
    }


    fetch(urlUpdateUser,init)
        .then(function (response) {
            if (response.ok) {
                return response.json();
                console.log(response)
            }
            return Promise.reject(response);
        }).then(function (data) {
        console.log("AFTER INSERT=========", data.title)
        console.log(data)

        // window.location.href = "/admin/index"
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}









