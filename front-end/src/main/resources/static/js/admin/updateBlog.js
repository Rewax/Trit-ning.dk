const thisForm      = document.getElementById('thisForm');
const author        = document.getElementById('author');
const image         = document.getElementById('image');
const title         = document.getElementById('title');
const editor        = document.getElementById('editor');
const editorCopy    = document.getElementById('editorCopy');
const id            = document.getElementById('id');

const formData      = new FormData();
const thePath       = window.location.pathname;
const urlTitle      = thePath.substring(thePath.lastIndexOf('/')+1)
const GetBlogUrl    = `http://localhost:5002/select/blog/${urlTitle}`;
const mail          = "kim@i-tritraening.dk";

// ======== INITIALIZE BLOG DATA ===========
initPageData().then(data =>{

    insertBlogData(data);
})

// ======== GET BLOG DATA ===========
function initPageData(){

    const requestOptions = {
        'content-type': 'application/json',
        method: 'GET',
        redirect: 'follow'
    };

    return fetch(GetBlogUrl, requestOptions)
        .then(response => response.json())
        .then((responseData) => {
            // console.log(responseData);
            return responseData;
        })
        .catch(error => console.warn(error));
}

// ========= INSERT BLOG DATA
function insertBlogData(data){

    editor.innerHTML    = data.description;
    author.value        = data.author;
    title.value         = data.title;
    id.value            = data.id;
    imgName.value       = data.img;

}

//==============================================FORM EVENT LISTENER=====================================================

thisForm.addEventListener('submit',async function (e) {
    e.preventDefault();
    if(img.files[0] === undefined || title.value === "") {
        warning.textContent = "Udfyld alle felter"
    }else {
        warning.setAttribute("style", "display:none;")
        await updateBlog();
    }

})

// ======== UPDATE BLOG DATA ===========
async function updateBlog() {
    let checkImg        = true;

    if(img.files[0] === undefined){
        checkImg = false;
    }

    let today = new Date();
    let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();

    console.log(editorCopy.value)
    const urlUpdateBlog = `http://localhost:5002/edit/blog/${urlTitle}`;

// CHECK EDITOR VALUE ===========
    let init;
    if (editorCopy.value == ""){
        init = {
            method: 'PUT',
            body: JSON.stringify({
                'id'        : id.value,
                'title'     : title.value,
                // 'description': editorCopy.value,
                'img'       : img.files[0].name,
                'datetime'  : date,
                'author'    : author.value,
            }),
            headers: {
                'Content-type': 'application/json'
            }
        }
        }else if (editorCopy.value!=""){
            init = {
                method: 'PUT',
                body: JSON.stringify({
                    'id'            : id.value,
                    'title'         : title.value,
                    'description'   : editorCopy.value,
                    'img'           : img.files[0].name,
                    'datetime'      : date,
                    'author'        : author.value,
                }),
                headers: {
                    'Content-type': 'application/json'
                }
        }
    }
    console.log(init)

// INITIALIZE UPDATE DATA ===========
    fetch(`http://localhost:5002/edit/blog`,init)
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
        return fetch(`http://localhost:5002/image/get/imageid/${imgName.value}/${pageData.id}/blog`,init)
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
    formData.append("review_id", "0")
    formData.append("author_id", "0")
    formData.append("page_id", "0")
    formData.append("blog_id", imgData.blog.id)

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







