let title = document.querySelector('#title');
let price = document.querySelector('#price');
let taxes = document.querySelector('#taxes');
let ads = document.querySelector('#ads');
let total = document.querySelector('#total');
let quantity = document.querySelector('#quantity');
let category = document.querySelector('#category');
let release = document.querySelector('#release');
let addBtn = document.querySelector('#addBtn');
let clearBtn = document.querySelector('#clearBtn');
let updatebtn = document.querySelector('#updatebtn');
let searchBar = document.querySelector('#searchBar');



// get total //
function getTotal() {
    if (price != '') {
        let result = (+price.value + +taxes.value + +ads.value);

        total.innerHTML = "EGP " + result;
    }
}



// Checking //
let datapro;

if (localStorage.products != null) {
    datapro = JSON.parse(localStorage.products)
} else {
    datapro = []


}



// Creat New Element //
addBtn.addEventListener('click', function createNewElement() {

    let newprod = {

        Title: title.value,
        Price: price.value,
        Taxes: taxes.value,
        Ads: ads.value,
        Quantity: quantity.value,
        Total: total.innerHTML,
        Category: category.value,
        ReleaseDate: release.value
    }

    // function of adding multiple items based on quantity entered 


    if (newprod.Quantity > 0) {
        for (let i = 0; i < newprod.Quantity; i++) {
            datapro.push(newprod)
        }
    } else {
        datapro.push(newprod)
    }


    localStorage.setItem('products', JSON.stringify(datapro))

    ClearInputs()
    ShowData()
})






// Clear Inputs //

function ClearInputs() {
    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    total.innerHTML = ''
    quantity.value = ''
    category.value = ''
    release.value = ''
}
clearBtn.addEventListener('click', () => {
    ClearInputs();
});






// Showing the Data in the HTML 

function ShowData() {
    let cartoona = ''
    for (let i = 0; i < datapro.length; i++) {

        cartoona += `
        <tr>
        <td>${i + 1}</td>
        <td>${datapro[i].Title}</td>
        <td> EGP ${datapro[i].Price}</td>
        <td> EGP ${datapro[i].Taxes}</td>
        <td> EGP ${datapro[i].Ads}</td>
        <td>${datapro[i].Category}</td>
        <td>${datapro[i].ReleaseDate}</td>

        <td>
          <button onclick="updatePro(${i})" class="updateButton" id="updateBtn"> Update</button>
          <button onclick="deleteItem(${i})" class="deleteButton" id="deleteBtn"> Delete</button>
        </td>
      </tr>
        `;

    }
    document.querySelector('#tableData').innerHTML = cartoona


    if (datapro.length > 1) {
        let deleteAll = document.querySelector('#deleteAll')
        deleteAll.innerHTML = '<button onclick="deleteAll()"  class="deletallButton"> Delete All </button>'
    } else {
        deleteAll.innerHTML = ''
    }

}
ShowData()





// Delete  item //

function deleteItem(i) {
    datapro.splice(i, 1);
    localStorage.products = JSON.stringify(datapro);

    ShowData()
}


// Delete  All //

function deleteAll() {
    localStorage.clear()
    datapro.splice(0)
    ShowData()
    let deleteAll = document.querySelector('#deleteAll')
    deleteAll.innerHTML = ''
}



// Update // 

function updatePro(i) {
    currentIndex = i
    title.value = datapro[i].Title;
    price.value = datapro[i].Price;
    taxes.value = datapro[i].Taxes;
    ads.value = datapro[i].Ads;
    category.value = datapro[i].Category;
    release.value = datapro[i].ReleaseDate;
    addBtn.classList.add('hide');
    updatebtn.classList.remove('hide');

}


updatebtn.addEventListener('click', function saveUpdates() {

    let editedprod = {
        Title: title.value,
        Price: price.value,
        Taxes: taxes.value,
        Ads: ads.value,
        Quantity: quantity.value,
        Total: total.innerHTML,
        Category: category.value,
        ReleaseDate: release.value
    };
    datapro[currentIndex] = editedprod
    ShowData()
    localStorage.setItem('products', JSON.stringify(datapro))
    updatebtn.classList.add('hide');
    addBtn.classList.remove('hide');
    ClearInputs();

})


// Search Function // 


function SearchProd(x) {

    let founds = [];
    for (let i = 0; i < datapro.length; i++) {
        if (datapro[i].Title.toLowerCase().includes(x.toLowerCase()) === true) {
            founds.push(datapro[i])

        }
    }


    let cartoona = ''
    for (let i = 0; i < founds.length; i++) {

        cartoona += `
        <tr>
        <td>${i + 1}</td>
        <td>${founds[i].Title}</td>
        <td> EGP ${founds[i].Price}</td>
        <td> EGP ${founds[i].Taxes}</td>
        <td> EGP ${founds[i].Ads}</td>
        <td>${founds[i].Category}</td>
        <td>${founds[i].Release}</td>

        <td>
          <button onclick="updatePro(${i})" class="updateButton" id="updateBtn"> Update</button>
          <button onclick="deleteItem(${i})" class="deleteButton" id="deleteBtn"> Delete</button>
        </td>
      </tr>
        `;

    }
    document.querySelector('#tableData').innerHTML = cartoona
}





