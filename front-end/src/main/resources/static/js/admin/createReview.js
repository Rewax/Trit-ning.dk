const reviewImage   = document.getElementById("reviewImage");
const author        = document.getElementById("author");
const description   = document.getElementById("editorCopy");
const thisForm      = document.getElementById("thisForm");
const formData      = new FormData();

thisForm.addEventListener('submit',async function (e){
    e.preventDefault();

console.log(description.value)
    // await insertImage()
    await insertReview();
})

// =============== INSERT REVIEW
async function insertReview(){
    fetch('http://localhost:5002/insert/review', {
        method: 'POST',
        body: JSON.stringify({

            'author': author.value,
            'description': description.value,
            'reviewImage': reviewImage.files[0].name,
        }),
        headers: {
            'Content-type': 'application/json'
        }
    }).then(function (response) {
        if (response.ok) {
            return response.json();
            console.log(response)
        }
        return Promise.reject(response);
    }).then(function (data) {
        getReview(author);

        console.log("AFTER INSERT=========", data.author)

        window.location.href = "/admin/view/page"
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}

// =============== GET AUTHOR
async function getReview(author){
    let getAuthorURL = `http://localhost:5002/select/one/review/${author.value}`;
    console.log("AUTHOR=======",getAuthorURL)

    let init = {
        'content-type': 'application/json',
        method: 'GET',
        redirect: 'follow'
    }

    fetch(getAuthorURL, init)
        .then(response => {
            console.log("RES ====",response)
            return response.json()
        })
        .then(data => {
            console.log("DDATA======1111"+data)
            insertImage(data)
        }).catch(function (e){
        console.log("Error=====",e);
    })
}

// ============ INSERT IMAGE FUNC
async function insertImage (data){
    formData.append("imageFile", reviewImage.files[0]);
    formData.append("page_id", "0")
    formData.append("blog_id", "0")
    formData.append("about_id", "0")
    formData.append("author_id", data.id)
    // formData.append("")
    console.log("DATA======="+data);

    const URL1 = "http://localhost:5002/image/upload"

    const requestOptions = {
        'content-type': 'multipart/form-data',
        method: 'POST',
        redirect: 'follow',
        body: formData

    };

    fetch(URL1, requestOptions)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (response) {
            console.log(response);
        });
}