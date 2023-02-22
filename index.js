const doctemp = document.querySelector(".weather1")
const doccity = document.querySelector(".weather2 p")
const docdate = document.querySelector(".weather2 span")
const docimg = document.querySelector(".weather3 img")
const doccond = document.querySelector(".weather3 span")
const searchField = document.querySelector(".searchField")
const form = document.querySelector("form")
const numtoday = { 0: 'Sunday', 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thrusday', 5: 'Friday', 6: 'Saturday' }

let target = 'London'

const fetchdata = async (target) => {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=3988a6766e0445b7bec162140232202&q=${target}`;
        const response = await fetch(url);
        const data = await response.json();

        const { current: { temp_c, condition: { icon, text } }, location: { name, localtime } } = data;
        updatedom(temp_c, name, localtime, icon, text)
    } catch (error) {
        alert("Location Not Found")
    }

}

function updatedom(temp, location, time, emoji, condition) {
    const exacttime = time.split(" ")[1]
    const exactdate = time.split(" ")[0]
    const exactday = numtoday[new Date(exactdate).getDay()]

    doctemp.innerText = temp + '°';
    doccity.innerText = location;
    docdate.innerText = `${exacttime} : ${exactday}  ${exactdate}`;
    docimg.src = emoji;
    doccond.innerText = condition
}

fetchdata(target)

form.addEventListener("submit", (e) => {
    e.preventDefault()
    target = searchField.value
    fetchdata(target)
})