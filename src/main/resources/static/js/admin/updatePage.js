const thisForm      = document.getElementById('thisForm');
const title         = document.getElementById('title');
// const banner        = document.getElementById('banner');
// const bannerImgName = document.getElementById('bannerImgName')
const img           = document.getElementById('img');
const imgName       = document.getElementById('imgName');
const editor        = document.getElementById('editor');
const editorCopy    = document.getElementById('editorCopy');
const warning       = document.getElementById('warning')
const pageId        = document.getElementById('pageId')

// const formData      = new FormData();
const formData2     = new FormData();

// ======== INITIALIZE PAGE DATA ===========
initPageData().then(data =>{

    insertPageData(data);
})

// ======== GET PAGE DATA ===========
function initPageData(){
    let thePath = window.location.pathname;
    const id = thePath.substring(thePath.lastIndexOf('/')+1)

    const GetPageUrl = `http://localhost:5002/select/one/activity/${id}`;

    console.log(id)

    const requestOptions = {
        'content-type': 'application/json',
        method: 'GET',
        redirect: 'follow'
    }

    return fetch(GetPageUrl, requestOptions)
        .then(response => response.json())
        .then((responseData) => {
            // console.log(responseData);
            return responseData;
        })
        .catch(error => console.warn(error));
}

// ========= INSERT PAGE DATA
function insertPageData(data){
    pageId.value = data.id;
    title.value = data.title;
    editor.innerHTML = data.description;
    // bannerImgName.value = data.banner;
    imgName.value = data.img;
    console.log(data.description)
}

//==============================================FORM EVENT LISTENER=====================================================
thisForm.addEventListener('submit',async function (e) {
    e.preventDefault();

    if(img.files[0] === undefined || title.value === "") {
        warning.textContent = "Udfyld alle felter"
    }else{
        warning.setAttribute("style", "display:none;")
        await updateActivity();
    }

})

// ======== UPDATE ACTIVITY DATA ===========
async function updateActivity() {
    // let checkBannerImg  = true;
    let checkImg        = true;


    // if(banner.files[0] === undefined){
    //     checkBannerImg = false;
    // }
    if(img.files[0] === undefined){
        checkImg = false;
    }

// CHECK EDITOR VALUE ===========
    let init;
    if (editorCopy.value == ""){
        init = {
            method: 'PUT',
            body: JSON.stringify({
                'id'    : pageId.value,
                'title' : title.value,
                // 'banner': banner.files[0].name,
                'img'   : img.files[0].name,

            }),
            headers: {
                'Content-type': 'application/json'
            }
        }


    }else if (editorCopy.value != ""){
        init = {
            method: 'PUT',
            body: JSON.stringify({

                'id'    : pageId.value,
                'title' : title.value,
                'description': editorCopy.value,
                // 'banner': banner.files[0].name,
                'img'   : img.files[0].name,

            }),
            headers: {
                'Content-type': 'application/json'
            }
        }
        console.log(init)
    }

// INITIALIZE UPDATE DATA ===========
    fetch(`http://localhost:5002/edit/page`,init)
        .then(function (response) {
            if (response.ok) {
                return response.json();
                console.log(response)
            }
            return Promise.reject(response);
        }).then(function (data) {
        console.log("AFTER INSERT=========", data)


// UPDATE BANNER IMAGE ===
//         if(checkBannerImg == true){
//             getBannerImg().then(bannerResponse => {
//                 console.log("GET BANNER IMG ======", bannerResponse)
//                 updateBannerImg(bannerResponse)
//             })
//         }

// UPDATE IMAGE ===
        if(checkImg == true){
            getImg().then(imageResponse => {
                console.log("GET IMG ======", imageResponse)
                updateImage(imageResponse)
            })
        }

// SUCCESS ===========
        window.location.href = "/admin/view/page"
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}

// ======== FETCH BANNER IMG DATA ===========
// function getBannerImg(){
//     let fetchImage = initPageData().then(pageData =>{
//         let init = {
//             method: "GET",
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//             }
//         }
//
//         return fetch(`http://localhost:5002/image/get/reviewImage/${bannerImgName.value}/${pageData.id}`,init)
//             .then((response) => response.json())
//             .then((responseData) => {
//                 console.log(responseData);
//                 return responseData;
//             })
//             .catch(error => console.warn(error));
//     })
//     return fetchImage;
// }

// ======== FETCH IMG DATA ===========
function getImg(){
    console.log("=========== GET IMAGE FETCH RUN ===========")
    let fetchImage = initPageData().then(pageData =>{
        console.log("PAGEDATA LOOKING FOR ID ==========",pageData)
        let init = {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }
        console.log()
        return fetch(`http://localhost:5002/image/get/imageid/${imgName.value}/${pageData.id}/page`,init)
            .then((response) => response.json())
            .then((responseData) => {
                console.log("IMAGE FETCH=========",responseData);
                return responseData;
            })
            .catch(error => console.warn(error));
    })
    return fetchImage;
}
//
// // ======== UPDATE BANNER IMG ===========
// function updateBannerImg(bannerImgData){
//     console.log("UPDATE BANNER DATA ====",bannerImgData)
//     formData.append("imageFile", banner.files[0]);
//     formData.append("image_id", bannerImgData.id)
//     formData.append("page_id", bannerImgData.pages.id)
//     formData.append("author_id", "0")
//
//     const URL1 = "http://localhost:5002/image/update"
//
//     const requestOptions = {
//         'content-type': 'multipart/form-data',
//         method: 'POST',
//         redirect: 'follow',
//         body: formData
//
//     };
//
//     fetch(URL1, requestOptions)
//         .then(function (response) {
//             console.log(response);
//         })
//         .catch(function (response) {
//             console.log(response);
//         });
// }

// ======== UPDATE IMG ===========
function updateImage(imgData){
    console.log("UPDATE IMAGE DATA ====",imgData)

    console.log("===============RUNNING UPLOAD IMAGE ===============")
    formData2.append("imageFile", img.files[0]);
    formData2.append("image_id", imgData.id)
    formData2.append("page_id", imgData.pages.id)
    formData2.append("author_id", "0")
    formData2.append("review_id", "0")
    formData2.append("blog_id", "0")

    const URL2 = "http://localhost:5002/image/update"

    const requestOptions2 = {
        'content-type': 'multipart/form-data',
        method: 'POST',
        redirect: 'follow',
        body: formData2

    };

    fetch(URL2, requestOptions2)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (response) {
            console.log(response);
        });
}

