const thisForm  = document.getElementById('registerForm');
const mail      = document.getElementById('email');
const role  = document.getElementById('role');
const id = document.getElementById('id');


// ============== GET USER ==============

// const mail = "kim@tritraening.dk";
const myUrl = `http://localhost:5002/select/users`;

const requestOptions = {
    'content-type': 'application/json',
    method: 'GET',
    redirect: 'follow'
};


    fetch(myUrl, requestOptions)
        .then(response = function(response){
            return response.json();
        })
        .then(data => {
            console.log(data)
            data.forEach(fillTbody)


        }).catch(error = function(error){
            console.log(error)
    })



//    ==================================================== FILL ACTIVITY TBODY =========================================
function fillTbody(item, index) {
   const tBody = document.querySelector('tbody')

    //---------- TR -----------------
    let tr = document.createElement('tr');
    tr.setAttribute('align','center');
    tBody.appendChild(tr);

    //---------- TH -----------------
    let th = document.createElement('th');
    th.textContent = item.id;
    tr.appendChild(th);

    //---------- TH -----------------
    let th1 = document.createElement('th1');
    th1.textContent = item.mail;
    tr.appendChild(th1);

    //---------- TD -----------------
    let td = document.createElement('td');
    td.setAttribute('align','center');
    tr.appendChild(td);

    //---------- A -----------------
    let a = document.createElement('a');
    a.setAttribute('class', 'mt-3 w-10 btn btn-info');
    a.href="/#";
    a.textContent = "Rediger Admin";
    td.appendChild(a);

    //---------- A -----------------
    let a1 = document.createElement('a');
    a1.setAttribute('class', 'mt-3 w-10 btn btn-danger');
    a1.setAttribute('onclick',`deleteUser(${item.id})`);
    // a1.href="/#";
    a1.textContent = "Slet";
    td.appendChild(a1);


}

function deleteUser(id) {
    if (confirm("vil du slette denner bruger ?")){
        fetch(`http://localhost:5002/delete/user/${id}`, {
            method: 'POST',
            body: JSON.stringify({
                'id': id.value,
            }),
            headers: {
                'Content-type': 'application/json'
            }
        }).then(function (response) {
            if (response.ok) {
                return response.json()
            }
            return Promise.reject(response);
        }).catch(function (error) {
            console.warn('Something went wrong.', error)
            // window.location.href = "/admin/view/pages"
        });
    }
}
