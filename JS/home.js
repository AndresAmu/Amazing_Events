var checkboxSelected = []
var textSearch = ""
var data = localStorage.getItem('data');
data = JSON.parse(data);



function crearCheckbox() { // Creo checkbox dinámicos

    var checkboxes = document.getElementById('checkboxes')
    var todosLosEventos = data.events.map(eventos => eventos.category) // 

    const dataArray = new Set(todosLosEventos)

    var category = [...dataArray]

    var inputCheckbox = ""
    category.forEach(category => {
        inputCheckbox += `<label class="m-2 checking form-check-label"><input class="m-1 form-check-input" type="checkbox" value="${category}">${category}</label>`
    })
    checkboxes.innerHTML = inputCheckbox

    var id = 1
    data.events.map(eventos => eventos.id = id++)
}
crearCheckbox()

// ----------------------------------------------------------------- //

var checkbox = document.querySelectorAll('input[type=checkbox]')

checkbox.forEach(check => check.addEventListener("click", (event) => {
    var checked = event.target.checked

    if (checked) {
        checkboxSelected.push(event.target.value)
        filterArray()
    } else {
        checkboxSelected = checkboxSelected.filter(uncheck => uncheck !== event.target.value)
        filterArray()
    }

}))
// ----------------------------------------------------------------- //
var inputSearch = document.getElementById("search")
inputSearch.addEventListener("keyup", (event) => {
    textSearch = event.target.value
    filterArray()
})

function filterArray() {
    let datoArray = []
    if (checkboxSelected.length > 0 && textSearch !== "") {
        checkboxSelected.map(category => {
            datoArray.push(...data.events.filter(event => event.category.toLowerCase().includes(textSearch.trim().toLowerCase()) && event.category == category)) || datoArray.push(...data.events.filter(event => event.name.toLowerCase().includes(textSearch.trim().toLowerCase())))
        })
    }
    else if (checkboxSelected.length > 0 && textSearch === "") {
        checkboxSelected.map(category => datoArray.push(...data.events.filter(event => event.category == category)))
    }
    else if (checkboxSelected.length == 0 && textSearch !== "") {
        datoArray.push(...data.events.filter(event => event.category.toLowerCase().includes(textSearch.trim().toLowerCase()))) || datoArray.push(...data.events.filter(event => event.name.toLowerCase().includes(textSearch.trim().toLowerCase())))
    }

    else { datoArray.push(...data.events) }


    displayCard(datoArray)
}
filterArray()

// ----------------------------------------------------------------- //


function displayCard(datoHome) {
    let html_home = ''

    for (var i = 0; i < datoHome.length; i++) {

        html_home += `
        
        <div class="card p-2 mb-4" style="width: 18rem;">
        <div class="card-body">
        
        <img class="card-img-top" src="${datoHome[i].image}"></div>
        <div class=" text-center dataCard">
        
        <h4 class="card-title text-center">${datoHome[i].name}</h4>
            <p>${datoHome[i].date}</p>
            <p class="card-text text-center ">${datoHome[i].category}</p>
            <p class="card-text text-center ">${datoHome[i].description}</p>
            <p class="card-text text-center ">$ ${datoHome[i].price}</p>     
            <a href="../HTML/details.html?id=${datoHome[i]._id}"><button class="btn botonCards">See more</button></a>
            
        </div>
        </div>
        `
    }
    if (html_home === '') {
        html_home = `<h6>Your search was not found</h6>`
    }
    document.querySelector('#mainCards').innerHTML = html_home


}
displayCard()

