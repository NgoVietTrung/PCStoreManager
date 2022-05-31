class pcgear {
    constructor(id, name, dateimport, img, amout, price) {
        this.id = id;
        this.name = name;
        this.dateimport = dateimport;
        this.img = img;
        this.amout = amout;
        this.price = price;
    }
}
class Helper {
    static formatCurrency(number) {
        return number.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    }
}
let pcgears = [];
const pcgear_data="pcgear_data";
function init(){
    if(localStorage.getItem(pcgear_data)=== null){
        pcgears=[
            new pcgear(
                1,
                "Asus ProArt PA278CV",
                "2022-02-22",
                "img/screen1.jpg",
                20,
                10990000,
            ),
            new pcgear(
                2,
                "Dell UltraSharp 4K U2720Q",
                "2022-02-22",
                "img/screen2.jpg",
                20,
                14800000,
            ),
            new pcgear(
                3,
                "LG IPS 23.8",
                "2022-02-22",
                "img/screen3.jpg",
                20,
                4990000,
            ),
            new pcgear(
                4,
                "Logitech G304 lightspeed",
                "2022-02-22",
                "img/mouse1.jpg",
                40,
                2990000,
            ),
            new pcgear(
                5,
                "Razer Mamba Elite",
                "2022-02-22",
                "img/mouse2.jpg",
                40,
                1990000,
            ),
            new pcgear(
                6,
                "Corsair IRONCLAW RGB WIRELESS",
                "2022-02-22",
                "img/mouse3.jpg",
                40,
                1990000,
            ),
            new pcgear(
                7,
                "Logitech G213 Gaming Keyboard",
                "2022-02-22",
                "img/kb1.jpg",
                40,
                990000,
            ),
            new pcgear(
                8,
                "Corsair K65 RGB RAPIDFIRE ",
                "2022-02-22",
                "img/kb2.jpg",
                40,
                990000,
            ),
            new pcgear(
                9,
                "LIGHTSYNC 7.1 G633s ",
                "2022-02-22",
                "img/hp.jpg",
                40,
                3990000,
            ),
        ];
        localStorage.setItem(pcgear_data, JSON.stringify(pcgears));
    }else{
        pcgears=JSON.parse(localStorage.getItem(pcgear_data));
    }
}
    
let id = 0;
function renderPCgear(data) {
    let htmls = data.map(function (pcgear) {
        return `<div class="render">
        <tr>
        <td class="text-center">PCS-${pcgear.id}</td>
        <td>${pcgear.name}</td>
        <td class="text-center">${pcgear.dateimport}</td>
        <td>
            <img class="img" src="${pcgear.img}" alt="">
        </td>
        <td class="text-center">${pcgear.amout}</td>
        <td class="text-right">${Helper.formatCurrency(pcgear.price)}</td>
        <td class="text-center-button">
            <button class="btn btn-success btn-sm"  id="edit" onclick='edit(${pcgear.id})'>Edit</button>
            <button class="btn btn-danger btn-sm"  id="remove" onclick='remove(${pcgear.id})'>Delete</button>
        </td>
    </tr>
    </div>
        `;
    });
    document.querySelector(".table>tbody").innerHTML = htmls.join("");
};

function additem() {
    let name = document.querySelector("#name").value;
    let dateimport = document.querySelector("#dateimport").value;
    let img = document.querySelector("#img").value;
    let amout = Number(document.querySelector("#amout").value);
    let price = Number(document.querySelector("#price").value);
    let id = findMaxId() + 1;
    let newpcgear = new pcgear(id, name, dateimport, img, amout, price);

    pcgears.push(newpcgear);
    localStorage.setItem(pcgear_data, JSON.stringify(pcgears));
    renderPCgear(pcgears);
    clearForm();
}

function clearForm() {
    document.querySelector("#name").value = "";
    document.querySelector("#img").value = "";
    document.querySelector("#dateimport").value = "";
    document.querySelector("#amout").value = ""
    document.querySelector("#price").value = "";
}
function resetform() {
    document.querySelector("#name").value = "";
    document.querySelector("#img").value = "";
    document.querySelector("#dateimport").value = "";
    document.querySelector("#amout").value = ""
    document.querySelector("#price").value = "";
}
function remove(pcgearId) {
    let confirmed = window.confirm("DELETE THIS");
    if (confirmed) {
        let posistion = pcgears.findIndex(function (pcgear) {
            return pcgear.id == pcgearId;
        });
        pcgears.splice(posistion, 1);
        localStorage.setItem(pcgear_data, JSON.stringify(pcgears));
        renderPCgear(pcgears);
    }
}
function edit(pcgearId) {
    console.log(pcgearId);
    for (let pcgear of pcgears) {
        if (pcgear.id == pcgearId) {
            document.querySelector("#name").value = pcgear.name;
            document.querySelector("#dateimport").value = pcgear.dateimport;
            document.querySelector("#img").value = pcgear.img;
            document.querySelector("#price").value = pcgear.price;
            document.querySelector("#amout").value = pcgear.amout;
            document.querySelector("#iditem").value = pcgear.id;
            document.getElementById("add").style.display = "none";
            document.getElementById("reset").style.display = "none";
            document.getElementById("submit").style.display = "inline-block";
            document.getElementById("cancel").style.display = "inline-block";

        }
    }
}
function findMaxId() {
    let max = 0;
    for (let gear of pcgears) {
        if (gear.id > max) {
            max = gear.id;
        }
    }
    return max;
}
function search(searchInput) {
    let result = pcgears.filter(function (pcgear) {
        return (
            pcgear.name.toLowerCase().indexOf(searchInput.value.toLowerCase()) != -1
        );
    });
    renderPCgear(result);
}
function submititem() {
    let name = document.querySelector("#name").value;
    let dateimport = document.querySelector("#dateimport").value
    let img = document.querySelector("#img").value;
    let price = Number(document.querySelector("#price").value);
    let amout = Number(document.querySelector("#amout").value);
    let id = Number(document.querySelector("#iditem").value);
    let pcgear = pcgears.find(function (pcgear) {
        return pcgear.id == id;
    });
    console.log(id);
    pcgear.name = name;
    pcgear.dateimport = dateimport;
    pcgear.img = img;
    pcgear.price = price;
    pcgear.amout = amout;
    localStorage.setItem(pcgear_data, JSON.stringify(pcgears));
    renderPCgear(pcgears);
    cancel();
}
function cancel() {
    document.querySelector("#name").value = "";
    document.querySelector("#img").value = "";
    document.querySelector("#dateimport").value = "";
    document.querySelector("#amout").value = ""
    document.querySelector("#price").value = "";
    document.getElementById("submit").style.display = "none";
    document.getElementById("cancel").style.display = "none";
    document.getElementById("add").style.display = "inline-block";
    document.getElementById("reset").style.display = "inline-block";
}
function clearIPForm() {
    document.querySelector("#username").value = null;
    document.querySelector("#password").value = null;
}


function logout() {
    location.href="https://ngoviettrung.github.io/PCStoreManager/";    
}
function main() {
    init();
    renderPCgear(pcgears);
}
main();
