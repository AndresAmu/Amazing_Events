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

checkbox.forEach(check => check.addEventListener("click", (event)=> {
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
            datoArray.push(...data.events.filter(event => event.category.toLowerCase().includes(textSearch.trim().toLowerCase())  && event.category == category)) || datoArray.push(...data.events.filter(event => event.name.toLowerCase().includes(textSearch.trim().toLowerCase()) ))
        })
    }
    else if (checkboxSelected.length > 0 && textSearch === "") {
        checkboxSelected.map(category => datoArray.push(...data.events.filter(event => event.category == category)))
    }
    else if (checkboxSelected.length == 0 && textSearch !== "") {
        datoArray.push(...data.events.filter(event => event.category.toLowerCase().includes(textSearch.trim().toLowerCase()) )) || datoArray.push(...data.events.filter(event => event.name.toLowerCase().includes(textSearch.trim().toLowerCase()) ))
    }
    
    else { datoArray.push(...data.events) }
    
    
    displayCard(datoArray)
}
filterArray()

// ----------------------------------------------------------------- //

function displayCard(datoPast) {
    var tarjetasHtml2 = ""

    for (var i = 0; i < datoPast.length; i++) {
        if(data.currentDate> datoPast[i].date){
        tarjetasHtml2 += `

        <div class="card p-2 mb-4" style="width: 18rem;">
        <div class="card-body">
        <img class="card-img-top" src="${datoPast[i].image}"></div>        
        <div class=" text-center dataCard">        
        <h5 class="card-title text-center mt-2">${datoPast[i].name}</h5>
        <p class="card-text text-center ">${datoPast[i].category}</p>        
        <p class="card-text text-center ">${datoPast[i].description}</p>
        <p>${datoPast[i].date}</p>        
        <p class="card-text text-center ">Price: $ ${datoPast[i].price}</p>        
        <buttom class="btn btn-danger"><a class=" text-light text-decoration-none" href="details.html?id=${datoPast[i]._id}">See more</a></buttom>        
        </div>        
        </div>
        `   
    }
}
if (tarjetasHtml2 === ''){
    tarjetasHtml2 = `<h6>Your search was not found</h6>`
}
    
    document.querySelector('#mainCardsPast').innerHTML = tarjetasHtml2

}
