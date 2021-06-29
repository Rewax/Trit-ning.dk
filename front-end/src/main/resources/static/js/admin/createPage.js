const thisForm      = document.getElementById('thisForm');
const title         = document.getElementById('title');
// const bannerImg     = document.getElementById('bannerImg');
const img           = document.getElementById('img');
const description   = document.getElementById('editorCopy');
const getImage      = document.getElementById('getImage')
const displayImage  = document.getElementById('displayImage')
const formData      = new FormData();
// const formData2     = new FormData();

thePath = window.location.pathname;
const urlId = thePath.substring(thePath.lastIndexOf('/')+1)

const GetPageUrl = `http://localhost:5002/select/activity/${urlId}`;

// ============ GET IMAGE EVENT LISTENER ==========

getImage.addEventListener("click", function(e){

    const URL2 = "http://localhost:5002/image/get/02052021.jpg"

    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(URL2, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then(data => {

            console.log(data)
            displayImage.src = URL.createObjectURL(data);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });

})

// ============ FORM EVENT LISTENER ==========

thisForm.addEventListener('submit',async function (e) {
    e.preventDefault();

    await getPages();
})

// ============ INSERT IMAGE FUNC
async function insertImage (data){
    formData.append("imageFile", img.files[0]);
    formData.append("author_id", "0")
    formData.append("blog_id", "0")
    formData.append("about_id", "0")
    formData.append("page_id", data.id)


    // console.log(formData.get("imageFile"))
    console.log(img.files[0]);

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

// ============ INSERT BANNER IMG FUNC
// async function insertBannerImage(data){
//     formData2.append("imageFile", bannerImg.files[0]);
//     formData2.append("author_id", "0")
//     formData2.append("blog_id", "0")
//     formData2.append("about_id", "0")
//     formData2.append("page_id", data.id)
//
//
//     // console.log(formData.get("imageFile"))
//     console.log(bannerImg.files[0]);
//
//     const URL1 = "http://localhost:5002/image/upload"
//
//     const requestOptions = {
//         'content-type': 'multipart/form-data',
//         method: 'POST',
//         redirect: 'follow',
//         body: formData2
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

// ============ INSERT PAGE FUNC
async function insertPage(){
console.log(editorCopy.value)
    let url = 'http://localhost:5002/insert/page'
    let requestOptions = {
        method: 'POST',
        redirect: 'follow',
        body: JSON.stringify({

            'title'         : title.value,
            'description'   : editorCopy.value,
            // 'banner'        : bannerImg.files[0].name,
            'img'           : img.files[0].name,


        }),
        headers: {
            'Content-type': 'application/json'
        }

    }
    fetch(url, requestOptions)
        .then(function (response) {
            if (response.ok) {
                return response.json();
                console.log(response)
            }
            return Promise.reject(response);
        }).then(function (data) {
        // insertBannerImage(data)
        insertImage(data)
        console.log("AFTER INSERT=========", data.author)

        window.location.href = "/admin/view/page"
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });

}

// ============ GET PAGES FUNC
async function getPages (){
    const myurl2 = `http://localhost:5002/select/page/${title.value}`
    const requestOptions2 = {
        'content-type': 'application/json',
        method: 'GET',
        redirect: 'follow'
    };

    fetch(myurl2,requestOptions2)
        .then(response => response.json())
        .then(data => {
            console.log(data)

            console.log("Findes allerede")
            document.getElementById('alreadyExists').innerHTML = "Aktivitet Eksistere allerede";
        }).catch(async function(e){
        await insertPage();

        console.log(e)
    })
}