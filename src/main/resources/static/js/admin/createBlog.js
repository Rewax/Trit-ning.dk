const thisForm   = document.getElementById('thisForm');
const author     = document.getElementById('author');
const image      = document.getElementById('img');
const title      = document.getElementById('title');;
const editor     = document.getElementById('editor');
const editorCopy = document.getElementById('editorCopy')
const formData   = new FormData();

// ============== INSERT BLOG ==============

thisForm.addEventListener('submit',async function (e) {
    e.preventDefault();

       await getBlog();
})

// ============ INSERT IMAGE FUNC
async function insertImage(data){
    formData.append("imageFile", image.files[0]);
    formData.append("author_id", "0")
    formData.append("page_id", "0")
    formData.append("about_id", "0")
    formData.append("blog_id",data.id)

    console.log(img.files[0]);

    const URL2 = "http://localhost:5002/image/upload"

    const requestOptions2 = {
        'content-type': 'multipart/form-data',
        method: 'POST',
        redirect: 'follow',
        body: formData
    };

    fetch(URL2, requestOptions2)
        .then(function(response){
            console.log(response);
        })
        .catch(function (response){
            console.log(response);
        });
}

// ============ INSERT PAGE FUNC
async function insertBlog() {

    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    console.log(date)

    let myUrl1 =  'http://localhost:5002/insert/blog';
    let requestOptions1 = {

        method: 'POST',
        body: JSON.stringify({
            'title'      : title.value,
            'description': editorCopy.value,
            'img'        : img.files[0].name,
            'datetime'   : date,
            'author'     : author.value,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }

    }
    fetch(myUrl1, requestOptions1)
        .then(function (response) {
            if (response.ok) {
                return response.json();
                console.log(response)
            }
            return Promise.reject(response);
        }).then(function (data) {
            insertImage(data)
        console.log("AFTER INSERT=========",data.title)
        console.log(data)

        window.location.href = "/admin/view/blogpost"
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}

// ============ GET BLOGS FUNC
async function getBlog (){
    const myUrl = `http://localhost:5002/select/blog/${title.value}`
    const requestOptions = {
        'content-type': 'application/json',
        method: 'GET',
        redirect: 'follow'
    };

    fetch(myUrl,requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            console.log("Findes allerede")
            document.getElementById('alreadyExists').innerHTML = "Blog Eksistere allerede";
        }).catch(async function(e){
        console.log(e)
        await insertBlog();
    })
}
