console.log("Client side JS file is loaded");

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const msg1 = document.querySelector('#msg-1');
const msg2 = document.querySelector('#msg-2');




weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = search.value
    console.log(location);

    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        console.log(data)
        msg1.textContent = data.location
        msg2.textContent = data.forecast
    })
})

})