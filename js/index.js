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

