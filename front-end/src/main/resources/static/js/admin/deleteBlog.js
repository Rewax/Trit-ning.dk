//    ==================================================== GET ACTIVITY ================================================
const myUrl = `http://localhost:5002/select/blogs`;

const requestOptions = {
    'content-type': 'application/json',
    method: 'GET',
    redirect: 'follow'
};

fetch(myUrl, requestOptions)
    .then(response => response.json())
    .then(data => {
        gotBlogData(data)

    }).catch(async function(e){
    console.log(e);
})


//    ==================================================== FILL ACTIVITY TBODY =========================================
function fillTbody(item, index) {
    const tbody = document.querySelector('.tbody')


    // === CREATE TR ===
    let tr = document.createElement('tr');
    tr.setAttribute('align', 'center');
    tbody.appendChild(tr);

    // === CREATE TH ===
    let th = document.createElement('th');
    th.textContent = item.id;
    tr.appendChild(th);

    // === CREATE TH ===
    let th1 = document.createElement('th');
    th1.textContent = item.title;
    tr.appendChild(th1);

    // === CREATE TH ===
    let th2 = document.createElement('th');
    th2.textContent = item.author;
    tr.appendChild(th2);

    // === CREATE TD ===
    let td = document.createElement('td');
    td.setAttribute('align', 'center');
    tr.appendChild(td);

    // === CREATE a ===
    let a = document.createElement('a');
    a.setAttribute('class', 'mt-3 w-10 btn btn-info');
    a.href = "/admin/edit/blog/"+ item.title;
    a.textContent = "Rediger Blog";
    td.appendChild(a);

    // === CREATE a1 ===
    let a1 = document.createElement('a');
    a1.setAttribute('class', 'mt-3 w-10 btn btn-danger');
    a1.setAttribute('onclick',  `deleteBlog(${item.id})`);
    a1.textContent = "slet";
    td.appendChild(a1);
}

function deleteBlog(id) {
    if (confirm("Vil du slette siden ?")) {
        const requestOptions = {
            'content-type': 'application/json',
            method: 'DELETE',
            redirect: 'follow'
        };
        const url = `http://localhost:5002/delete/blog/${id}`
        console.log(id)
        fetch(url,requestOptions)
            .then(res => res.json())
            .then(data => {
            })
            .catch(err => {
                window.location.href = "/admin/view/blogpost"

            });
    }

}

function gotBlogData(data){
    data.forEach(fillTbody)
}






// const thisForm = document.getElementById('thisForm');
// const author = document.getElementById('author');
// const image = document.getElementById('image');
// const title = document.getElementById('title');
// const editor = document.getElementById('editor');
// const editorCopy = document.getElementById('editorCopy');
//
//
// thePath = window.location.pathname;
// const urlTitle = thePath.substring(thePath.lastIndexOf('/')+1)
//
// const GetPageUrl = `http://localhost:5002/select/blog/${urlTitle}`;
//
// console.log(urlTitle)
//
// const requestOptions2 = {
//     'content-type': 'application/json',
//     method: 'GET',
//     redirect: 'follow'
// }
//
// fetch(GetPageUrl, requestOptions2)
//     .then(response => response.json())
//     .then(data => {
//         insertBlogData(data);
//         console.log(data);
//     }).catch(function (e){
//     console.log(e);
// })
//
// function insertBlogData(data){
//     editor.innerHTML = data.description;
//     author.value = data.author;
//     title.value = data.title;
//     id.value = data.id;
//     console.log(data.description)
// }
//
// //==============================================FORM EVENT LISTENER=====================================================
// thisForm.addEventListener('submit',async function (e) {
//     e.preventDefault();
//
//     await updateBlog();
//
// })
//
// async function updateBlog() {
//
//     console.log(editorCopy.value)
//     const urlUpdatePage = `http://localhost:5002/edit/blog/${urlTitle}`;
//
//     fetch(`http://localhost:5002/edit/blog`,{
//         method: 'PUT',
//         body: JSON.stringify({
//
//             'id'   : id.value,
//             'title': title.value,
//             'description': editorCopy.value,
//             'img': img.value,
//             'author': author.value,
//         }),
//         headers: {
//             'Content-type': 'application/json'
//         }
//     })
//         .then(function (response) {
//             if (response.ok) {
//                 return response.json();
//                 console.log(response)
//             }
//             return Promise.reject(response);
//         }).then(function (data) {
//         console.log("AFTER INSERT=========", data.title)
//         console.log(data)
//
//         // window.location.href = "/admin/index"
//     }).catch(function (error) {
//         console.warn('Something went wrong.', error);
//     });
// }