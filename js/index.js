import data from "./fooditem.js";

let cat1 = document.querySelector("#biryani");
let cat2 = document.querySelector("#paneer");
let cat3 = document.querySelector("#chicken");
let cat4 = document.querySelector("#vegetable");
let cat5 = document.querySelector("#chinese");
let cat6 = document.querySelector("#southindian");

let categoryList = [
    cat1, cat2, cat3, cat4, cat5, cat6
];

let cat1Data = data.foodItem.filter( (item) => item.category == 'biryani' );
let cat2Data = data.foodItem.filter( (item) => item.category == 'paneer' );
let cat3Data = data.foodItem.filter( (item) => item.category == 'chicken' );
let cat4Data = data.foodItem.filter( (item) => item.category == 'vegetable' );
let cat5Data = data.foodItem.filter( (item) => item.category == 'chinese' );
let cat6Data = data.foodItem.filter( (item) => item.category == 'south indian' );

let foodItemList = [
    cat1Data, cat2Data, cat3Data, cat4Data, cat5Data, cat6Data
];

// populate data in sections
foodItemList.forEach( ( allFoodItems, id ) => {

    let heading = document.createElement('h2');
    heading.innerText = allFoodItems[id].category;
    categoryList[id].appendChild( heading );

    let foodList = document.createElement('div');
    foodList.setAttribute( 'class', "food-list" );

    allFoodItems.map(element => { 

        let card = document.createElement('div');
        card.setAttribute( 'class', "card" );

        let topBar = document.createElement('div');
        topBar.setAttribute( 'class', "topbar" );

        let star = document.createElement('button');
        star.setAttribute( 'class', "rating" );

        let starIcon = document.createElement('i');
        starIcon.setAttribute( 'class', "fa-solid fa-star" );
        star.appendChild( starIcon );

        let span = document.createElement('span');
        span.innerText = String(element.rating).padEnd(3, '.0');
        star.appendChild( span );

        topBar.appendChild( star );

        let addToCart = document.createElement('button');
        addToCart.setAttribute( 'class', "add-to-cart" );
        addToCart.setAttribute( 'id', `prod-${element.id}` );

        let addToCartIcon = document.createElement('i');
        addToCartIcon.setAttribute( 'class', "fa-solid fa-heart" );
        addToCartIcon.setAttribute( 'id', `prod-${element.id}` );

        addToCart.appendChild( addToCartIcon );

        topBar.appendChild( addToCart );
        card.appendChild( topBar );

        let featuredImage = document.createElement('div');
        featuredImage.setAttribute( 'class', "featured-image" );

        let image = document.createElement('img');
        image.setAttribute( 'src', element.img );

        featuredImage.appendChild( image );
        card.appendChild( featuredImage );

        let productTitle = document.createElement('h3');
        productTitle.setAttribute( 'class', 'product-title' );
        productTitle.innerText = element.name;

        card.appendChild( productTitle );

        let productPrice = document.createElement('h3');
        productPrice.setAttribute( 'class', 'product-price' );
        productPrice.innerText = element.price;

        card.appendChild( productPrice );

        foodList.appendChild( card );
        categoryList[id].appendChild( foodList );

    });

} );

// create right sidebar filter
function createFilterByCategory() {
    const QuickNavigate= [...new Map(data.foodItem.map(item=> [item['category'],item])).values()];
    const filterLinks = document.querySelector("#filterLinks");

    QuickNavigate.map( item => {

        let listItem = document.createElement('li');
        let anchor = document.createElement('a');
        let implodedCategory = item.category.split(' ').join('');
        anchor.setAttribute( 'href', `#${implodedCategory}` );

        let img = document.createElement('img');
        img.setAttribute( 'src', item.img );
        img.setAttribute( 'alt', item.category );
        anchor.appendChild( img );

        let span = document.createElement('span');
        span.innerText = item.category;
        anchor.appendChild( span );

        listItem.appendChild( anchor );
        filterLinks.appendChild( listItem );
    } );

}

createFilterByCategory();


// CART LOGIC STARTS ------------------------------------------------

// cart object
let cartDetails = JSON.parse( localStorage.getItem('jsm-cart') ) || {};
let cartConstants = {
    package: 20,
    delivery: 30,
    discount: 10
};

const updateCart = () => {
    const showCartText = document.querySelector('#showCartText');
    let cartCount = Object.keys( cartDetails ).length;

    if( cartCount > 0 ){
        showCartText.innerText = cartCount + ' Items';
    } else {
        alert('The cart is now empty');
        document.location.reload();
    }
    localStorage.setItem( 'jsm-cart', JSON.stringify( cartDetails ) );
};

if( Object.keys( cartDetails ).length > 0 ) {
    updateCart();
}

// function for adding item to cart
const addToCart = ( event ) => {
    let productId = event.target.id.replace( 'prod-', '' );
    if( productId in cartDetails ) {
        if( confirm('The product is already added to the cart. Do you want to increase quantity?') ) {
            cartDetails[productId] = cartDetails[productId] + 1;
        }
    } else {
        cartDetails[productId] = 1;
    }
    updateCart();
    if( event.target.tagName == 'BUTTON' ) {
        event.target.querySelector('i').style.color = 'red';
        event.target.style.backgroundColor = 'black'
    } else {
        event.target.style.color = 'red';
        event.target.parentNode.style.backgroundColor = 'black'
    }
};

// set event listener on every add to cart button
document.querySelectorAll('.add-to-cart').forEach( item => {
    item.addEventListener( 'click', addToCart )
} );

// function to remove item from cart
const removeFromCart = ( event ) => {
    delete( cartDetails[ event.target.id ] );

    const miniTable = document.querySelector('#miniTable > table');
    miniTable.remove();
    createMiniTable();
};

// function to remove item from cart table
const removeFromCartTable = ( event ) => {
    const removableItem = document.querySelector('#row-' + event.target.id );
    removableItem.remove();
    updateCart();
};

// function for gettig product details by Id
function getProductDetails( productId ) {
    return data.foodItem.find( item => item.id === productId );
}

// create mini table from cart object
const createMiniTable = () => {

    const miniTable = document.querySelector("#miniTable");
    const table = document.createElement('table');
    
    const caption = document.createElement('caption');
    caption.innerText = 'Cart Total';
    table.appendChild( caption );

    const tbody = document.createElement('tbody');

    const tr1 = document.createElement('tr');
    const th1 = document.createElement('th');
    th1.setAttribute( 'scope', 'col' );
    th1.innerText = 'Grand Total';
    tr1.appendChild( th1 );
    const td1 = document.createElement('td');
    td1.innerText = grandTotal();
    tr1.appendChild( td1 );
    tbody.appendChild( tr1 );

    const tr2 = document.createElement('tr');
    const th2 = document.createElement('th');
    th2.setAttribute( 'scope', 'col' );
    th2.innerText = 'Packaging';
    tr2.appendChild( th2 );
    const td2 = document.createElement('td');
    td2.innerText = cartConstants['package'];
    tr2.appendChild( td2 );
    tbody.appendChild( tr2 );

    const tr3 = document.createElement('tr');
    const th3 = document.createElement('th');
    th3.setAttribute( 'scope', 'col' );
    th3.innerText = 'Delivery';
    tr3.appendChild( th3 );
    const td3 = document.createElement('td');
    td3.innerText = cartConstants['delivery'];
    tr3.appendChild( td3 );
    tbody.appendChild( tr3 );

    const tr4 = document.createElement('tr');
    const th4 = document.createElement('th');
    th4.setAttribute( 'scope', 'col' );
    th4.innerText = 'Discount';
    tr4.appendChild( th4 );
    const td4 = document.createElement('td');
    td4.innerText = cartConstants['discount'];
    tr4.appendChild( td4 );
    tbody.appendChild( tr4 );

    const tr5 = document.createElement('tr');
    const th5 = document.createElement('th');
    th5.setAttribute( 'scope', 'col' );
    th5.innerText = 'Net Total';
    tr5.appendChild( th5 );
    const td5 = document.createElement('td');
    td5.innerText = netTotal();
    tr5.appendChild( td5 );
    tbody.appendChild( tr5 );

    table.appendChild( tbody );
    miniTable.appendChild( table );

};

// create table header for createCartTable function
const createTableHeader = ( cartTable, table ) => {

    const caption = document.createElement('caption');
    caption.innerText = 'Cart Items';

    table.appendChild( caption );

    const thead = document.createElement('thead');

    const htr = document.createElement('tr');

    const hth1 = document.createElement('th');
    htr.appendChild( hth1 );

    const hth2 = document.createElement('th');
    hth2.innerText = 'Image';
    htr.appendChild( hth2 );

    const hth3 = document.createElement('th');
    hth3.innerText = 'Product Name';
    htr.appendChild( hth3 );

    const hth4 = document.createElement('th');
    hth4.innerText = 'Price';
    htr.appendChild( hth4 );

    const hth5 = document.createElement('th');
    hth5.innerText = 'Quantity';
    htr.appendChild( hth5 );

    const hth6 = document.createElement('th');
    hth6.innerText = 'Total';
    htr.appendChild( hth6 );

    thead.appendChild( htr );
    table.appendChild( thead );

    cartTable.appendChild( table );

};

// decrease item quantity in cart
const decreaseQty = event => { 
    const productId = event.target.parentNode.parentNode.id.replace( 'row-', '' );
    if( cartDetails[productId] > 1 ) {
        cartDetails[productId] -= 1; 
    }
    event.target.nextSibling.innerText = cartDetails[productId];
    event.target.parentNode.nextSibling.innerText = getProductDetails( Number(productId) ).price * cartDetails[productId];

    const miniTable = document.querySelector('#miniTable > table');
    miniTable.remove();
    createMiniTable();
    updateCart();
};

// increase item quantity in cart
const increaseQty = event => { 
    const productId = event.target.parentNode.parentNode.id.replace( 'row-', '' );
    if( cartDetails[productId] < 10 ) {
        cartDetails[productId] += 1; 
    }
    event.target.previousSibling.innerText = cartDetails[productId];
    event.target.parentNode.nextSibling.innerText = getProductDetails( Number(productId) ).price * cartDetails[productId];

    const miniTable = document.querySelector('#miniTable > table');
    miniTable.remove();
    createMiniTable();
    updateCart();
};

// create table body for createCartTable function
const createTableBody = ( table ) => {

    const tbody = document.createElement('tbody');
    let productDetail, tr, td, removebtn, incBtn, decBtn, span, img;

    Object.entries( cartDetails ).forEach( ( [productId, qty] ) => {
        
        productDetail = getProductDetails( Number(productId) );

        tr = document.createElement('tr');
        tr.setAttribute( 'id', 'row-' + productId );

        for( let i = 1; i <= 6; i++ ) {
            td = document.createElement('td');
            switch( i ) {
                case 1:
                    removebtn = document.createElement('button');
                    removebtn.setAttribute( 'class', 'removeItem' );
                    removebtn.setAttribute( 'id', productDetail.id );
                    removebtn.innerText = 'x';
                    removebtn.addEventListener( 'click', removeFromCart );
                    removebtn.addEventListener( 'click', removeFromCartTable );
                    td.appendChild( removebtn );
                    break;
                case 2:
                    img = document.createElement('img');
                    img.setAttribute( 'src', productDetail.img );
                    td.appendChild( img );
                    break;
                case 3:
                    td.innerText = productDetail.name;
                    break;
                case 4:
                    td.innerText = productDetail.price;
                    break;
                case 5:
                    decBtn = document.createElement('button');
                    decBtn.setAttribute( 'class', 'qtyBtn minus' );
                    decBtn.innerText = '-';
                    decBtn.addEventListener( 'click', decreaseQty );
                    td.appendChild( decBtn );
                    span = document.createElement('span');
                    span.innerText = qty;
                    td.appendChild( span );
                    incBtn = document.createElement('button');
                    incBtn.setAttribute( 'class', 'qtyBtn plus' );
                    incBtn.innerText = '+';
                    incBtn.addEventListener( 'click', increaseQty );
                    td.appendChild( incBtn );
                    break;
                case 6:
                    td.innerText = productDetail.price * qty;
                    break;
            }
            tr.appendChild( td );
        }

        tbody.appendChild( tr );

    } );

    table.appendChild( tbody );

};

// create cart table from cart object
const createCartTable = () => {

    const cartTable = document.querySelector(".cartTable");
    const table = document.createElement('table');
    
    createTableHeader( cartTable, table );
    createTableBody( table );

    const hr = document.createElement('hr');
    cartTable.appendChild( hr );

    const btn = document.createElement('button');
    btn.setAttribute( 'class', 'btn checkout' );
    btn.setAttribute( 'id', 'main-checkout' );
    btn.innerText = 'Checkout';
    btn.addEventListener( 'click', checkoutPageHide );
    cartTable.appendChild( btn );

};

// calculate grand total
const grandTotal = () => {

    let total = 0;
    Object.entries( cartDetails ).forEach( ( [productId, qty], index ) => {
        total += getProductDetails( Number(productId) ).price * qty;
    } );
    return total;

};

// calculate net total
const netTotal = () => {
    return grandTotal() + cartConstants['package'] + cartConstants['delivery'] - cartConstants['discount'];
};

// checkout page show function
const checkoutPageShow = event => {
    event.preventDefault();

    if( document.querySelector(".wrapper").classList.contains('hidden') ) {
        return;
    }

    let cartCount = Object.keys( cartDetails ).length;

    if( cartCount > 0 ) {
        createCartTable();
        createMiniTable();
        document.querySelector(".wrapper").classList.add('hidden');
        document.querySelector(".cartTable").classList.remove('hidden');
        document.querySelector("#cartSummary").classList.remove('hidden');
        document.querySelector(".filter").classList.add("hidden");
    } else {
        alert('Cart is empty');
    }
};

document.querySelector(".showCart").addEventListener( 'click', checkoutPageShow );

// checkout page hide function
const checkoutPageHide = event => {
    event.preventDefault();
    alert('Order placed!');
    localStorage.removeItem('jsm-cart');
    document.location.reload();
};

document.querySelector("#side-checkout").addEventListener( 'click', checkoutPageHide );
