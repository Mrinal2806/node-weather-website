console.log("client side javascript file is loaded")

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })

// })


const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messgaetwo = document.querySelector('#message-2')
// messageone.textContent = 'from javascript'

weatherform.addEventListener('submit' , (e) => {
    const location = search.value
    
    messageone.textcontent = 'loading...'
    messgaetwo.textContent = ''
    
    e.preventDefault()
    console.log('testing')

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageone.textContent = data.error
            }
            else{
                messageone.textContent = data.location
                messgaetwo.textContent = data.forecast
                // console.log(data.forecast)
                // console.log(data.location)
            }
        })
    })
    
})
