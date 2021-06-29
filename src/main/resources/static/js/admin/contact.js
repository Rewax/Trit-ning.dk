const firstname = document.getElementById('firstname');
const lastname  = document.getElementById('lastname');
const fromMail  = document.getElementById('mail');
const topic     = document.getElementById('topic');
const message   = document.getElementById('message');
const thisForm  = document.getElementById('thisForm');
const formData  = new FormData();

thisForm.addEventListener('submit', async function (e){
    e.preventDefault();

    await sendMail();
})


async function sendMail(){
    formData.append("firstname", firstname.value)
    formData.append("lastname", lastname.value)
    formData.append("fromMail", fromMail.value)
    formData.append("topic", topic.value)
    formData.append("message", message.value)
    let urlMail = `http://localhost:5002/contact`;
    const requestOptions = {
        'content-type': 'multipart/form-data',
        method: 'POST',
        redirect: 'follow',
        body: formData

    };

    fetch(urlMail, requestOptions)
        .then(function (response){
            if (response.ok){
                return response.json()
                console.log(response)
            }
            return Promise.reject(response);
        }).then(function (data){
            console.log(data)
    }).catch(function (error){
        console.warn('Something went wrong.', error);
    });
}