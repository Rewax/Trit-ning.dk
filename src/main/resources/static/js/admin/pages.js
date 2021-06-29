const editor        = document.getElementById('editor');
const author        = document.getElementById("author");
const editorCopy    = document.getElementById("editorCopy");

//    ==================================================== GET ACTIVITY ================================================
const myUrl = `http://localhost:5002/select/page`;

const requestOptions = {
     'content-type': 'application/json',
    method: 'GET',
    redirect: 'follow'
};

fetch(myUrl, requestOptions)
    .then(response => response.json())
    .then(data => {
        gotPageData(data)
        console.log(data)
    }).catch(async function(e){
        console.log(e);
    })

function gotPageData(data){
    data.forEach(fillTbody)
}

//    ==================================================== FILL PAGE TBODY =========================================
function fillTbody(item, index) {
    const tbody = document.querySelector('.tbody')
    console.log(item.id)
    console.log(index)

    // === CREATE TR ===
    let tr = document.createElement('tr');
    tr.setAttribute('align', 'center');
    tbody.appendChild(tr);

        // === CREATE TH ===
    let th = document.createElement('th');
    th.textContent = item.id;
    tr.appendChild(th);

    // === CREATE TH ===
    let th1 = document.createElement('th');
    th1.textContent = item.title;
    tr.appendChild(th1);

    // === CREATE TD ===
    let td = document.createElement('td');
    td.setAttribute('align', 'center');
    tr.appendChild(td);

    // === CREATE a ===
    let a = document.createElement('a');
    a.setAttribute('class', 'mt-3 w-10 btn btn-info');
    a.href = "/admin/edit/page/"+ item.id;
    a.textContent = "Rediger Side";
    td.appendChild(a);

    // === CREATE a1 ===
    let a1 = document.createElement('a');
    a1.setAttribute('class', 'mt-3 w-10 btn btn-danger');
    a1.setAttribute("onclick", `deletePage(${item.id})`);
    a1.textContent = "Slet";
    td.appendChild(a1);
}

function deletePage(id) {
    if (confirm("Vil du slette siden ?")) {
        const requestOptions = {
            'content-type': 'application/json',
            method: 'DELETE',
            redirect: 'follow'
        };
        const url = `http://localhost:5002/delete/page/${id}`
        console.log(id)
        fetch(url,requestOptions)
            .then(res => res.json())
            .then(data => {
            })
            .catch(err => {
                // window.location.href = "/admin/view/pages"
            });
    } else {
    }

}

//    ==================================================== GET REVIEW  =========================================

const GetReviewUrl  = 'http://localhost:5002/select/all/reviews';

fetch(GetReviewUrl ,requestOptions)
    .then(response => response.json())
    .then(data => {
        data.forEach(fillTbodyReview)
        console.log(data)
    }).catch(function (error){
    console.log(error)
})


//    ==================================================== FILL REVIEW TBODY =========================================
function fillTbodyReview(item, index) {
    const tbodyR = document.querySelector('.tbodyR')
    console.log(index)
    console.log(item.id)


    // === CREATE TR ===
    let tr = document.createElement('tr');
    tr.setAttribute('align', 'center');
    tbodyR.appendChild(tr);

    // === CREATE TH ===
    let th = document.createElement('th');
    th.textContent = item.id;
    tr.appendChild(th);

    // === CREATE TH ===
    let th1 = document.createElement('th');
    th1.textContent = item.author;
    tr.appendChild(th1);

    // === CREATE TD ===
    let td = document.createElement('td');
    td.setAttribute('align', 'center');
    tr.appendChild(td);

    // === CREATE a ===
    let a = document.createElement('a');
    a.setAttribute('class', 'mt-3 w-10 btn btn-info');
    a.href = "/admin/edit/review/"+ item.id;
    a.textContent = "Rediger Udtalelse";
    td.appendChild(a);

    // === CREATE a1 ===
    let a1 = document.createElement('a');
    a1.setAttribute('class', 'mt-3 w-10 btn btn-danger');
    a1.setAttribute("onclick", `deleteReview(${item.id})`);
    a1.textContent = "Slet";
    td.appendChild(a1);
}

function deleteReview(id) {
    if (confirm("vil du slette udtalelsen ?")){
        const requestOptions = {
            'content-type': 'application/json',
            method: 'DELETE',
            redirect: 'follow'
        };
        const delReviewUrl = `http://localhost:5002/delete/review/${id}`
        console.log(id)
        fetch(delReviewUrl,requestOptions)
            .then(res => res.json())
            .then(data => {
            })
            .catch(err => {
                window.location.href = "/admin/view/pages"
            });
    }
}





