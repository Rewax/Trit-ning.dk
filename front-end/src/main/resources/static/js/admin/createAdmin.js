const thisForm  = document.getElementById('registerForm');
const mail      = document.getElementById('email');
const password  = document.getElementById('password')
const password2  = document.getElementById('confirm_password');
const userrole  = document.getElementById('role');


// ========= EVENT LISTENER ==========
thisForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    if(password2.value != password.value){
        console.log("test")
        document.getElementById('passwordValid').innerHTML = "Password skal være ens!";
    }else if(password.value == password2.value){
        await insertUser();
        window.location.href = "/admin/index"
    }

});

// ========= INSERT USER ==========

async function insertUser(){
    await fetch('http://localhost:5002/insert/user',{
        method: 'POST',
        body: JSON.stringify({
            'enabled'   : 1,
            'mail'      : mail.value,
            'password'  : password.value,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log(data)
        window.location.href = "/admin/view/admins"
    }).catch(function (error) {
        console.warn('Something went wrong.', error);


    })
}
