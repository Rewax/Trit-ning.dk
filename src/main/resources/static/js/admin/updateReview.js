const author        = document.getElementById("author");
const editorCopy    = document.getElementById("editorCopy");
const thisForm      = document.getElementById("thisForm");
const editor        = document.getElementById('editor');
const warning       = document.getElementById('warning')
const imgName       = document.getElementById('imgName');
const img           = document.getElementById('img');

const formData      = new FormData();
let thePath         = window.location.pathname;
const GetPageUrl    = thePath.substring(thePath.lastIndexOf('/')+1)

// ======== INITIALIZE PAGE DATA ===========
initPageData().then(data =>{

    insertReviewData(data);
})

// ======== GET PAGE DATA ===========
function initPageData(){


    const GetReviewUrl  = `http://localhost:5002/select/review/${GetPageUrl}`;

    const requestOptions = {
        'content-type': 'application/json',
        method: 'GET',
        redirect: 'follow'
    }


    return fetch(GetReviewUrl, requestOptions)
        .then(response => response.json())
        .then((responseData) => {
            // console.log(responseData);
            return responseData;
        })
        .catch(error => console.warn(error));


}

// ========= INSERT PAGE DATA
function insertReviewData(data){
    author.value = data.author
    editor.innerHTML = data.description
    imgName.value = data.reviewImage;

    console.log(data)
}
//==============================================FORM EVENT LISTENER=====================================================
thisForm.addEventListener('submit',async function (e){
    e.preventDefault();

    if(img.files[0] === undefined || author.value === "") {
        warning.textContent = "Udfyld alle felter"
    }else{
        warning.setAttribute("style", "display:none;")
    await updateReview();
    }

})

// ======== UPDATE ACTIVITY DATA ===========
async function updateReview(){
    let checkImg        = true;

    if(img.files[0] === undefined){
        checkImg = false;
    }

// CHECK EDITOR VALUE ===========
    let init;
    if (editorCopy.value == ""){

        init = {
            method: 'POST',
            body: JSON.stringify({

                'id'         : GetPageUrl,
                'author'     : author.value,
                'reviewImage': img.files[0].name

            }),
            headers: {
                'Content-type': 'application/json'
            }
        }


    }else if (editorCopy.value != ""){
        init = {
            method: 'POST',
            body: JSON.stringify({

                'id'         : GetPageUrl,
                'author'     : author.value,
                'description': editorCopy.value,
                'reviewImage': img.files[0].name,

            }),
            headers: {
                'Content-type': 'application/json'
            }
        }
    }

    // console.log(init)

// INITIALIZE UPDATE DATA ===========
    fetch(`http://localhost:5002/edit/review/`,init)
    .then(function (response) {
        if (response.ok) {
            return response.json();
            console.log(response)
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log("AFTER INSERT=========", data.author)
        console.log(data)

// UPDATE IMAGE ===
        if(checkImg == true){
            getImg().then(imageResponse => {
                console.log("GET IMG ======", imageResponse)
                updateImage(imageResponse)
            })
        }

// SUCCESS ===========
        // window.location.href = "/admin/index"
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}


// ======== FETCH IMG DATA ===========
function getImg(){
    console.log("=========== GET IMAGE FETCH RUN ===========")
    let fetchImage = initPageData().then(pageData =>{
        let init = {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }
        return fetch(`http://localhost:5002/image/get/imageid/${imgName.value}/${pageData.id}/review`,init)
            .then((response) => response.json())
            .then((responseData) => {
                console.log("IMAGE FETCH=========",responseData);
                return responseData;
            })
            .catch(error => console.warn(error));
    })
    return fetchImage;
}

// ======== UPDATE IMG ===========
function updateImage(imgData){
    console.log("UPDATE IMAGE DATA ====",imgData)

    console.log("===============RUNNING UPLOAD IMAGE ===============")
    formData.append("imageFile", img.files[0]);
    formData.append("image_id", imgData.id)
    formData.append("review_id", imgData.review.id)
    formData.append("author_id", "0")
    formData.append("page_id", "0")
    formData.append("blog_id", "0")

    const URL2 = "http://localhost:5002/image/update"

    const requestOptions2 = {
        'content-type': 'multipart/form-data',
        method: 'POST',
        redirect: 'follow',
        body: formData

    };

    fetch(URL2, requestOptions2)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (response) {
            console.log(response);
        });
}