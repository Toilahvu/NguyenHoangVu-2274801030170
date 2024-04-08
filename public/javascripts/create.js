var clothes = []; // Đảm bảo biến clothes được định nghĩa ở phạm vi toàn cục

//add colothes
function addClothes() {
    var id = document.getElementById("clothesId").value;
    var name = document.getElementById("nameClothes").value;
    var typesOfClothes = document.getElementById("typesOfClothes").value
    var price = document.getElementById("price").value
    var amount = document.getElementById("amount").value
    var brand = document.getElementById("brand").value
    var material = document.getElementById("material").value

    var new_clothes = {
        id: id,
        name: name,
        price: price,
        amount: amount,
        brand: brand,
        material: material,
        typesOfClothes: typesOfClothes
    };
     
    clothes.push(new_clothes); // Đẩy đối tượng bộ quần áo vào mảng clothes
    document.getElementById("message").textContent = `The clothes ${name} add sucessfully`;
}

//submit clothes
function submitClothes() {
    fetch('/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clothes) // Sử dụng biến clothes đã được định nghĩa ở phạm vi toàn cục
    })
    .then(response => response.json())
    .then(data => {
        console.log("response from server: " + data)
        alert(data.message)
        resetForm();
    })
    .catch(err => {
        console.error("Lỗi:", err);
    })
}

//reset form
function resetForm() {
    document.getElementById("createForm").reset(); 
    document.getElementById("message").textContent = "";
    setFocusName();
    clothes = []; // Đặt lại mảng clothes
}

//set focus input clothes name
function setFocusName() {
    document.getElementById("nameClothes").focus();
}

// back home
function backHome() {
    window.location.href = "home.html"
}

// Random Id
function randomId() {
    const numbers = '0123456789';
    let randomString = 'Chinh';

    for (let i = 0; i < 4; i++)
        randomString += numbers.charAt(Math.floor(Math.random() * numbers.length));

    return randomString;
}

//get random id and assign to input id
document.getElementById('clothesId').value = randomId();

