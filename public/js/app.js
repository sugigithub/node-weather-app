console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = document.querySelector('input').value;
    messageOne.textContent = "finding the weather.."
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            console.log(data)
            if (data.error) {
                console.log(data.error)
            } else {
                console.log(data.address)
                messageOne.textContent = data.address.location
                messageTwo.textContent = data.address.forecast.description+ " and feels like "+ data.address.forecast.feelslike
            }
        })
    })
})