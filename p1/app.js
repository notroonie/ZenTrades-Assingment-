document.addEventListener('DOMContentLoaded', () => {
    fetch('https://s3.amazonaws.com/open-to-cors/assignment.json')
        .then(response => response.json())
        .then(data => displayProducts(data))
        .catch(error => console.error('Error fetching data:', error));
});

function displayProducts(data) {
    var products = []

    for (var prop in data.products) {
        products.push({
            id: prop,
            ...data.products[prop]
        })
    }

    const sortedProducts = products.sort((a, b) => b.popularity - a.popularity);
    console.log(products)

    const productListTable = document.getElementById('product-list');
    productListTable.innerHTML = `
        <tr>
            <th>Sr No</th>
            <th>Title</th>
            <th>Price (Rs)</th>
            <th>Popularity</th>
        </tr>
    `;

    sortedProducts.map((product, index) => {
        const productRow = document.createElement('tr');
        productRow.innerHTML = `
            <td>${index + 1}</td>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product.popularity}</td>
        `;
        productListTable.appendChild(productRow);
    });
}
