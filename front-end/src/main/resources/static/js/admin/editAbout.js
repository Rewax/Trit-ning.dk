const img           = document.getElementById("aboutImg");
const editorCopy    = document.getElementById("editorCopy");
const title         = document.getElementById("title");
const thisForm      = document.getElementById("thisForm");
const editor        = document.getElementById('editor');
const warning       = document.getElementById('warning')
const imgName       = document.getElementById('imgName');

const formData      = new FormData();

// ======== INITIALIZE PAGE DATA ===========
initPageData().then(data =>{

    insertPageData(data);
})

// ======== GET PAGE DATA ===========
function initPageData(){
    let thePath = window.location.pathname;
    const urlId = thePath.substring(thePath.lastIndexOf('/')+1)

    const GetAboutUrl  = `http://localhost:5002/select/about/${urlId}`;

    const requestOptions = {
        'content-type': 'application/json',
        method: 'GET',
        redirect: 'follow'
    }

    fetch(GetAboutUrl ,requestOptions)
        .then(response => response.json())
        .then(data => {
            insertAboutData(data)
            console.log(data.title)
            console.log(data)
        }).catch(function (error){
        console.log(error)
    })
}

// ========= INSERT PAGE DATA
function insertAboutData(data){
    title.value = data.title
    editor.innerHTML = data.description
    imgName.value = data.img;

    console.log(data.description)
}

//==============================================FORM EVENT LISTENER=====================================================
thisForm.addEventListener('submit',async function (e){
    e.preventDefault();

    if(img.files[0] === undefined || title.value === ""){
        warning.textContent = "Udfyld alle felter"
    } else{
        await updateAbout();
    }

})

// ======== UPDATE ABOUT DATA ===========
async function updateAbout(){
    console.log(editorCopy.value)
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

                'id'        : urlId,
                'title'     : title.value,
                // 'aboutImg'  : img.files[0].name

            }),
            headers: {
                'Content-type': 'application/json'
            }
        }
    }else if (editorCopy.value != ""){
        init = {
            method: 'POST',
            body: JSON.stringify({

                'id'         : urlId,
                'title'      : title.value,
                'description': editorCopy.value,
                // 'aboutImg'   : img.files[0].name,

            }),
            headers: {
                'Content-type': 'application/json'
            }
        }
    }

    console.log(init)
// INITIALIZE UPDATE DATA ===========
    fetch(`http://localhost:5002/edit/about/`,init)
        .then(function (response) {
            if (response.ok) {
                return response.json();
                console.log(response)
            }
            return Promise.reject(response);
        }).then(function (data) {
        console.log("AFTER INSERT=========", data.title)
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

        return fetch(`http://localhost:5002/image/get/imageid/${imgName.value}/${pageData.id}`,init)
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
    formData2.append("imageFile", img.files[0]);
    formData2.append("image_id", imgData.id)
    formData2.append("page_id", imgData.pages.id)
    formData2.append("author_id", "0")

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
