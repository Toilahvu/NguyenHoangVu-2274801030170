function createTableHtml(clothes) {
    let htmlOutput = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
    
            .container {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                margin-top: 20px;
            }
    
            .product {
                width: 23%;
                margin-bottom: 20px;
                border: 1px solid #dddddd;
                padding: 8px;
                text-align: center;
            }
    
            .product img {
                max-width: 100%;
                height: auto;
                margin-bottom: 10px;
            }
    
            .product h3, .product p {
                margin: 5px 0;
                text-align: left;
            }
    
            #backButton {
                display: block;
                margin: 20px auto;
                padding: 10px 20px;
                background-color: #007bff;
                color: #fff;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }
    
            #backButton:hover {
                background-color: #0056b3;
            }
            </style>
        </head>
        <body>
            <div class="container">`;

        // Duyệt qua mảng clothes và thêm thông tin của mỗi mặt hàng vào bảng HTML
        for (let i = 0; i < clothes.length; i++) {
            let item = clothes[i];
            if (!item.name) continue; // Kiểm tra xem item.name có tồn tại không
            let imageName = item.name.toLowerCase().replace(/\s+/g, ' ') + '.jpg'; // Đổi dấu cách thành dấu gạch ngang để phù hợp với tên file hình ảnh
            htmlOutput += `
                <div class="product">
                    <img src="/images/${imageName}" alt="${item.name}">
                    <p>Id: ${item.id}</p>
                    <h3>${item.name}</h3>
                    <p>Price: ${item.price} $</p>
                    <p>Amount: ${item.amount}</p>
                    <p>Brand: ${item.brand}</p>
                    <p>Material: ${item.material}</p>
                    <p>Type: ${item.typesOfClothes}</p>
                </div>`;

            if ((i + 1) % 4 === 0 || i === clothes.length - 1) { // Đóng hàng sau mỗi 4 mặt hàng hoặc khi đến mặt hàng cuối cùng
                htmlOutput += `
                <div style="flex-basis: 100%; height: 0;"></div>`; // Tạo một div rỗng để dừng hàng và chuyển sang hàng mới
            }
        }

        htmlOutput += `
            </div>
            <button id="backButton" onclick="goBack()">Back</button> <!-- Thêm nút "Back" -->
            <script>
                function goBack() {
                    window.location.href = "/pages/findClothes.html"
                }
            </script>
        </body>
        </html>`;
        return htmlOutput;
}

module.exports = {
    createTableHtml
}
