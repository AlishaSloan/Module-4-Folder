let categories = new Map();
        let allProducts;

        // fetch API
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(json => { allProducts = json; loadProducts(json); loadFilterOptions(); })

        // loads products from api
        function loadProducts(products) {
            document.querySelector('#product-list').innerHTML = '';

            products.forEach(product => {
                let categorySlug = product.category.replaceAll(' ', '_').replaceAll("'", '');
                categories.set(product.category, categorySlug);

                addProduct(product);
            });

            if (products.length == 0) document.querySelector('#product-list').innerHTML = '<p>No matching products.</p>';
        }

        // clone, then populate, then append a new template
        function addProduct(item) {

            const template = document.getElementById("card-template").content.cloneNode(true);
            template.querySelector('.card-title').innerText = item.title;
            template.querySelector('.card-header').innerHTML = getCategoryIcon(item.category) + item.category;
            template.querySelector('.card-subtitle').innerText = '$' + item.price;
            template.querySelector('.card-img-top').src = item.image;
            template.querySelector('.card-img-top').alt = item.title;
            template.querySelector('.card-text').innerText = item.description.substring(0, 50) + '...';
            template.querySelector('.card').className = 'card '+ categories.get(item.category);
            template.querySelector('.card').id = 'product' + item.id;
            template.querySelector('.btn').addEventListener('click', (e) => expandText(e, item.id, item.description));
            document.querySelector('#product-list').appendChild(template);
        }

        // displays an icon to match the product category 
        function getCategoryIcon(cat) {
            switch (cat.toLowerCase()) {
                case "men's clothing": return '<i class="fa-solid fa-shirt"></i> ';
                case "women's clothing": return '<i class="fa-solid fa-person-dress"></i> ';
                case "jewelery": return '<i class="fa-regular fa-gem"></i> ';
                case "electronics": return '<i class="fa-solid fa-tv"></i> ';
            }
            // default generic fallback if no matches
            return '<i class="fa-brands fa-shirtsinbulk"></i> ';
        }

        // populate the list of categories for the drop-down 
        function loadFilterOptions() {
            let filterSelect = document.getElementById('category_filter')
            categories.forEach((slug, cat) => {
                filterSelect.innerHTML += `<option value="${cat}">${cat}</option>`;
            });
        }

        // filter the list of products by the category chosen from the drop-down
        function filterProducts(e) {
            let selectedCategory = e.target.value;
            let filteredProducts = allProducts.filter(product => product.category == selectedCategory);

            loadProducts(filteredProducts)
        }

        // filter the list of products matching to the search text
        function searchProducts() {
            let searchText = document.getElementById('searchText').value.toLowerCase();
            let filteredProducts = allProducts.filter(product => product.title.toLowerCase().indexOf(searchText) >= 0 ||
                product.description.toLowerCase().indexOf(searchText) >= 0 || product.category.toLowerCase().indexOf(searchText) >= 0);

            loadProducts(filteredProducts)
        }        

