// Cart
let cartIcon = document.querySelector("#add-to-cart");
let cart = document.querySelector(".cart");
let closeCartIcon = document.querySelector("#close-cart");
// Open cart
cartIcon.onclick = () =>{
    cart.classList.add("active");
}
// Close cart
closeCartIcon.onclick = () =>{
    cart.classList.remove("active");
}

// Cart Work
if (document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready);
}else{
    ready();
}

//Making functions
function ready(){
    //remove item form cart
    var removeButton = document.getElementsByClassName('cart-remove');
    console.log(removeButton);
    for(var i = 0; i < removeButton.length; i++){
        var button = removeButton[i];
        button.addEventListener('click', removeItem)
    }
    // Quantity changes form cart
    var quantityInput = document.getElementsByClassName("cart-quantity");
    for(var i = 0; i < quantityInput.length; i++){
        var input = quantityInput[i];
        input.addEventListener('change', quantityChanged)
    }
    // Add to cart button
    var addToCartButton = document.getElementsByClassName("addToCart");
    for(var i = 0; i < addToCartButton.length; i++){
        var button = addToCartButton[i];
        button.addEventListener('click', addCart)
    }
}
// remove item form cart
function removeItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateCartTotal()
}
// sort quantity input
function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateCartTotal()
}
// add to cart button
function addCart(event){
     var button = event.target;
     var shopProducts = button.parentElement;
     var title = shopProducts.getElementsByClassName("product-title")[0].innerHTML;
     var price = shopProducts.getElementsByClassName("price")[0].innerText;
     var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
     addProductCart(title , price , productImg);
     updateCartTotal();
}

// render
function addProductCart(title, price, productImg){
    var cartShopBox = document.createElement("div");
        cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0]
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");

    for(var i = 0; i < cartItemsNames.length; i++){
        if(cartItemsNames[i].innerHTML == title){
            alert("You have already add this item to cart.")
            return;
        }
    }

    var cartBoxContent = `
                   <img src="${productImg} " alt="" class="cart-img">
                   <div class="detail-box">
                   <div class="cart-product-title">${title}</div>
                   <div class="cart-price">${price}</div>
                   <input type="number" value="1" class="cart-quantity">
                          </div>
                    <i class="fa-solid fa-trash cart-remove"></i>
`;

 cartShopBox.innerHTML = cartBoxContent;
 cartItems.append(cartShopBox)
 cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeItem)
 cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged)

// complated with buy now
document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyBtnClick);
function  buyBtnClick(){
    alert("Your order completed!")
    var cartContent = document.getElementsByClassName("cart-content")[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.lastChild);
        
    }
}

}


//calculate cart total
function updateCartTotal(){
    var carBoxes = document.getElementsByClassName('cart-box');
    var total = 0;
    for(var i = 0; i < carBoxes.length; i++){
        var cartBox = carBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
        total = Math.round(total * 100 ) / 100;
        
        document.getElementsByClassName("total-price")[0].innerText = "$" + total;
    }
}