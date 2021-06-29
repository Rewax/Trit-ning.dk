const aboutImg      = document.getElementById("aboutImg");
const description   = document.getElementById("editorCopy");
const title         = document.getElementById("title");
const thisForm      = document.getElementById("thisForm");
const formData      = new FormData();

thisForm.addEventListener('submit',async function (e){
    e.preventDefault();

    await insertAbout();
    console.log(description.value)
})

// ============ INSERT IMAGE FUNC
async function insertImage(data){
    formData.append("imageFile", aboutImg.files[0]);
    formData.append("author_id", "0")
    formData.append("page_id", "0")
    formData.append("blog_id", "0")
    formData.append("about_id", data.id)

    console.log(aboutImg.files[0]);

    const URL = "http://localhost:5002/image/upload"

    const requestOptions = {
        'content-type': 'multipart/form-data',
        method: 'POST',
        redirect: 'follow',
        body: formData
    };

    fetch(URL,requestOptions)
        .then(function (response){
            console.log(response);
        })
        .catch(function (response){
            console.log(response);
        });
}

// ============ INSERT ABOUT FUNC

    async function insertAbout(){
        fetch('http://localhost:5002/insert/about', {
            method: 'POST',
            body: JSON.stringify({

                'title'      : title.value,
                'description': description.value,
                'aboutImg'   : aboutImg.files[0].name,
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
            insertImage(data)
            console.log("AFTER INSERT=========", data.title)
            console.log(data)

            window.location.href = "/admin/view/pages"
        }).catch(function (error) {
            console.warn('Something went wrong.', error);
        });
    }


