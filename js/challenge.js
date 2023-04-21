let timerValue = 0
const counter = document.querySelector('#counter')

//Increments the counter every second
function timer(){
    counter.textContent = ++timerValue
}

let counterID = setInterval(timer, 1000)

//Manually decrements the counter using the minus button
const minus = document.querySelector('#minus')
minus.addEventListener('click', handleMinus)

function handleMinus(){
    counter.textContent = --timerValue;
}

//Manually increments the counter using the plus button
const plus = document.querySelector('#plus')
plus.addEventListener('click', handlePlus)

function handlePlus(){
    counter.textContent = ++timerValue;
}

//Adds a like to each individual number of the counter
const like = document.querySelector('#heart')
like.addEventListener('click', handleLike)

let arrayResult = true //Will turn false if the number being liked does not already have likes, and will trigger a new like being formed via createNewLike
function handleLike(){
    const listElements = document.querySelector('ul.likes').childNodes
    if(listElements.length === 0){
        createNewLike();
    } else if (arrayResult === true) {
        for (let i=0; i<listElements.length; i++){
            if (listElements[i].dataset.num == timerValue){
                arrayResult = true
                listElements[i].querySelector('span').textContent = (Number(listElements[i].querySelector('span').textContent) + 1)
            } else {
                arrayResult = false
            }
        }
    }
    if (arrayResult === false) {
            arrayResult = true
            createNewLike()
    }
}

//If a new number is being liked, creates a new li element and adds it to the ul likes list on the DOM
function createNewLike(){
    let newLike = document.createElement('li');
    newLike.dataset.num = timerValue;
    newLike.innerHTML = `
    ${timerValue} has been liked
        <span>1</span>
     time(s)`
    
     document.querySelector('ul.likes').appendChild(newLike)
}

//Will pause and resume the counter
const pause = document.querySelector('#pause')
pause.addEventListener('click', handlePause)
let paused = false

function handlePause(){
    if(paused === false){
        clearInterval(counterID)
        pause.textContent = 'resume'
        minus.disabled = true
        plus.disabled = true
        like.disabled = true
        paused = true
    } else {
        counterID = setInterval(timer, 1000)
        pause.textContent = 'pause'
        minus.disabled = false
        plus.disabled = false
        like.disabled = false
        paused = false
    }
}

//Submits comments
let form = document.querySelector('form')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  createComment(e.target['comment-input'].value)
  form.reset()
})

//Appends comments to the DOM
function createComment(comment){
    let p = document.createElement('p')
    p.textContent = comment
    document.querySelector('#list').appendChild(p)
}