var data = localStorage.getItem('data');
data = JSON.parse(data);

function getData() {

    
    var id = location.search.split("?id=")
    console.log(location)
    console.log(location.search)
    console.log(id)
    var selectedId =id[1]
    console.log(selectedId)

    var datass = data.events.find((datos) => {
        return datos._id == selectedId

    })
    console.log(datass)
    var tempHtml = `
    <div class="card" style="max-width: 340px;">
    <div class="card-body">
    <img class="card-img-top" src="${datass.image}"></div>
    <div class=" text-center dataCard">
    <h5 class="card-title text-center mt-2">${datass.name}</h5>        
    <p class="card-text text-center ">${datass.description}</p>
    <p>${datass.date}</p>
    <p class="card-text text-center ">Category:${datass.category}</p>
    <p class="card-text text-center ">Place:${datass.place}</p> 
    <p class="card-text text-center ">Capacity:${datass.capacity}</p> 
    <p class="card-text text-center ">Assistance:${datass.assistance}</p>
    <p class="card-text text-center ">Price: $ ${datass.price}</p>

    </div>
    </div> 
    `
    document.querySelector("#mainCardsDetails").innerHTML = tempHtml

}

getData()