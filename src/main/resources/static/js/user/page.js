const desc      = document.getElementById('desc')
const pageTitle  = document.getElementById('title')
const blogImage = document.getElementById('blogImage')

let thePath = window.location.pathname;
const urlId = thePath.substring(thePath.lastIndexOf('/')+1)
initPageData().then(data =>{
    console.log(data)
    insertPageData(data);
})

// ======== GET PAGE DATA ===========
function initPageData(){

    console.log(urlId)
    const GetAboutUrl  = `http://localhost:5002/ui/get/one/page/${urlId}`;

    const requestOptions = {
        'content-type': 'application/json',
        method: 'GET',
        redirect: 'follow'
    }

    return fetch(GetAboutUrl, requestOptions)
        .then(response => response.json())
        .then((responseData) => {
            console.log(responseData);
            return responseData;
        })
        .catch(error => console.warn(error));
}

function insertPageData(data){
    desc.textContent  = data.pages.description;
    pageTitle.textContent = data.pages.title;

// ======== GET IMAGE FUNCTION ===========
    getImg(data.pages).then(imageData =>{
        console.log(imageData)
        blogImage.src = URL.createObjectURL(imageData);
    })
//     console.log(data)
}

function getImg(pageData){
    console.log(pageData)
    const URL2 = `http://localhost:5002/image/get/page/${pageData.id}/${pageData.img}`

    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return fetch(URL2, requestOptions)
        .then(response => response.blob())
        .then((responseData) => {
            // console.log(responseData);
            return responseData;
        })
        .catch(error => console.warn(error));
}