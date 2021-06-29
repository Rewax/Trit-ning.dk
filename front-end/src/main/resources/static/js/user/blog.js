
initPageData().then(data =>{
    console.log(data)
    data.forEach(insertPageData)
    // insertPageData(data);
})

function initPageData() {

    const url = "http://localhost:5002/ui/get/blog"
    const requestOptions = {
        'content-type': 'application/json',
        method: 'GET',
        redirect: 'follow'
    };

    return fetch(url, requestOptions)
        .then(response => response.json())
        .then((responseData) => {
            console.log(responseData);
            return responseData;
        })
        .catch(error => console.warn(error));
}

function insertPageData(item){
    let blog = document.getElementById('blog')

//    ==== DIV ====
    let div = document.createElement('div');
    div.setAttribute('class', 'col-sm-4');
    blog.appendChild(div);

//    ==== A TAG ====
    let a = document.createElement('a');
    a.href = "/blog/"+item.blog.id;
    div.appendChild(a);

// ======== GET IMAGE FUNCTION ===========
    getImg(item.blog.author).then(data =>{
        console.log(data)

        // ==== IMG ====
        let img = document.createElement('img');
        img.src = URL.createObjectURL(data);
        a.appendChild(img);

    })

//    ==== P TAG ====
    let p01 = document.createElement('p');
    p01.textContent = item.blog.title;
    p01.setAttribute('align', 'left');
    div.appendChild(p01);

//    ==== P TAG ====
    let p02 = document.createElement('p');
    p02.textContent = "Skrevet af: " + item.blog.author;
    p02.setAttribute('align', 'left');
    div.appendChild(p02);

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
    //
    // fetch(URL2, requestOptions)
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         return response.blob();
    //     })
    //     .then(data => {
    //
    //         console.log(data)
    //         displayImage.src = URL.createObjectURL(data);
    //     })
    //     .catch(error => {
    //         console.error('There has been a problem with your fetch operation:', error);
    //     });
}