myFunction()

function myFunction() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Læs mere";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Læs mindre";
        moreText.style.display = "inline";
    }
}

// document.getElementById("go").addEventListener("click", function() {
//     var img = document.querySelectorAll("#container .image img")[0];
//
//     img.style.height = "200px";
//     img.style.width = "100px";
// });


// ======== INITIALIZE PAGE DATA ===========
initPageData().then(data =>{
    console.log(data)
    data.forEach(insertPageData)
    // insertPageData(data);
})
// ======== GET PAGE DATA ===========
function initPageData() {

    const url = "http://localhost:5002/ui/get/review"
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
    const review = document.getElementById('review')

    // ==== DIV2 =====
    let div02 = document.createElement('div');
    div02.setAttribute('class', 'col-sm')
    review.appendChild(div02);

    // ==== FIGURE =====
    let figure = document.createElement('figure')
    div02.appendChild(figure);

    // ==== DIV3 =====
    let div03 = document.createElement('div');
    div02.setAttribute('class', 'col-sm-4')
    figure.appendChild(div03);

// ======== GET IMAGE FUNCTION ===========
    getImg(item.review.author).then(data =>{
        console.log(data)

        // ==== IMG =====
        let img = document.createElement('img');
        img.setAttribute('class', 'figureImg')
        img.src = URL.createObjectURL(data);
        div03.appendChild(img)

    })

    // ==== FIGCAPTAION =====
    let figcaptaion = document.createElement('figcaption');
    figure.appendChild(figcaptaion);

    // ==== P1 =====
    let p01 = document.createElement('p')
    p01.textContent = item.review.author;
    figcaptaion.appendChild(p01)

    // ==== P2 =====
    let p02 = document.createElement('p')
    p02.innerHTML = item.review.description;
    div02.appendChild(p02)

    // ==== BUTOON =====
    let button = document.createElement('button')
    button.setAttribute('onclick', 'myFunction()')
    // button.setAttribute('id', 'myBtn')
    button.textContent = "Læs Mere"
    div02.appendChild(button)

}

function getImg(reviewData){
    console.log(reviewData)
    const URL2 = `http://localhost:5002/image/get/${reviewData}`

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