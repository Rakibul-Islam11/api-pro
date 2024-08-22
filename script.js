"use strict"

let catchFindInpt = document.getElementById("findPhoneInput");
let catchFindBTN = document.getElementById("findPhoneBTN");
let catchOutptCard = document.getElementById("cardMain");
let catchpopoutpot = document.getElementById("popOutpt");


function getInptData() {
    let getData = catchFindInpt.value;
    return getData;
}

async function apiFunc(reciveInData) {
    loader(true)
    let callApi =  await fetch(`https://openapi.programming-hero.com/api/phones?search=${reciveInData}`);
    let conjson = await callApi.json();
    let getData = conjson.data
    
    getData.forEach(phone => {
        console.log(phone);
        
        let createEL = document.createElement("div");
        createEL.classList = `card card-compact bg-base-100 w-96 shadow-xl`
        createEL.innerHTML = `
            <figure>
                <img src="${phone.image}" alt="Shoes" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">${phone.brand}</h2>
                <p>${phone.phone_name}</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary" onclick ="phoneDetails('${phone.slug}')">Dtails</button>
                </div>
            </div>
        `
        catchOutptCard.appendChild(createEL)
        
    })
    loader(false)
    
}

async function phoneDetails(receivePhoneID) {
    
    let callApiTwo = await fetch(`https://openapi.programming-hero.com/api/phone/${receivePhoneID}`);
    let conjsonTwo = await callApiTwo.json();
    let getDataTwo = conjsonTwo.data;
    console.log(getDataTwo);
    
    let craeteELtwo = document.createElement("div");
    craeteELtwo.innerHTML = `
        <dialog id="my_modal_1" class="modal h-auto">
            <div class="modal-box">
                <img style="width: 150px; margin: auto;" src="${getDataTwo.image}" alt="">
                <h1 style="margin: auto; text-align: center;">${getDataTwo.name}</h1>
                <h3 class="text-lg font-bold">Specifications</h3>
                
                <h4 class="py-4 font-bold">Main feture</h4>
                <p><h5 class="font-bold">Storage</h5>${getDataTwo.mainFeatures.storage ? getDataTwo.mainFeatures.storage : "no"}</p>
                <p><h5 class="font-bold">Display size</h5>${getDataTwo.mainFeatures.displaySize ? getDataTwo.mainFeatures.displaySize : "no"}</p>
                <p><h5 class="font-bold">Display size</h5>${getDataTwo.mainFeatures.chipSet ? getDataTwo.mainFeatures.chipSet : "no"}</p>
                <p><h5 class="font-bold">WLAN</h5>${getDataTwo.mainFeatures.chipSet ? getDataTwo.mainFeatures.chipSet : "no"}</p>
                <p><h5 class="font-bold">bloothe</h5>${getDataTwo.others?.Bluetooth ? getDataTwo.others.Bluetooth : "no"}</p>

                <div class="modal-action">
                    <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    `
    catchpopoutpot.appendChild(craeteELtwo);

    /* it is modal show function from tailwind*/
    my_modal_1.showModal()
    
}

function loader(trueRecvie) {
    let catchSpinner = document.getElementById("spinner")
    if (trueRecvie) {
        catchSpinner.classList.remove("hidden")
    } else {
        catchSpinner.classList.add("hidden")
    }
}
