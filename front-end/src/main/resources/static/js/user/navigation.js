getActivity()

function getActivity(){
    const pagesURL = `http://localhost:5002/ui/select/activities`;
    const requestOptions ={
        'content-type': 'application/json',
        method: 'GET',
        redirect: 'follow'
    };

    fetch(pagesURL,requestOptions)
        .then(response => response.json())
        .then(data =>{
            console.log(data)
            data.forEach(fillList)
        }).catch(error = function (error){
        console.log(error)
    })
}


function fillList(item, index){
    const frontPageList = document.querySelector('#frontPageList')
console.log(item)

    // === CREATE li  ===

    let li = document.createElement('li');
    li.setAttribute('class', 'nav-item ml-5 mr-5')
    frontPageList.appendChild(li);

    // === CREATE ATAG ===

    let a = document.createElement('a');
    a.textContent = item.title;
    a.setAttribute('class', 'nav-link text-truncate')
    a.setAttribute('href', `/page/${item.id}`)
    li.appendChild(a)
}

