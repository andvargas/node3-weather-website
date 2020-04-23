
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'L o a d i n g ...'
    messageTwo.textContent = ''
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data2) => {
            if (data2.error) {
                messageOne.textContent = data2.error
            } else {
                messageOne.textContent = data2.location
                messageTwo.textContent = data2.forecast
            }

        })
    })
})