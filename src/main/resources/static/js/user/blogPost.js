const desc      = document.getElementById('description')
const title     = document.getElementById('title')
const blogImage = document.getElementById('blogImage')
// ======== INITIALIZE PAGE DATA ===========
initPageData().then(data =>{

    insertPageData(data);
})

// ======== GET PAGE DATA ===========
function initPageData(){
    let thePath = window.location.pathname;
    const urlId = thePath.substring(thePath.lastIndexOf('/')+1)

    const GetAboutUrl  = `http://localhost:5002/ui/get/one/blog/${urlId}`;

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
    title.textContent = data.blog.title;
    desc.innerHTML  = data.blog.description;

// ======== GET IMAGE FUNCTION ===========
getImg(data.blog.author).then(imageData =>{
    console.log(imageData)
    blogImage.src = URL.createObjectURL(imageData);
})
    console.log(data)
}

function getImg(blogData){
    console.log(blogData)
    const URL2 = `http://localhost:5002/image/get/blog/${blogData}`

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

