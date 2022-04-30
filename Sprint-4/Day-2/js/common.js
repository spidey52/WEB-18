function isAuthenticated() {
	let user = JSON.parse(localStorage.getItem('signin'))

	let navlinks = document.querySelector('.nav-links')
	navlinks.innerHTML = user ?
		`
		<div class="link"> <a href="mens.html">Men</a> </div>
			<div class="link"> <a href="womens.html">Women</a> </div>
			<div class="link"> <a href="login.html">Login</a> </div>
			<div class="link"> <a href="signup.html">signup</a> </div>
		`
		:
		`
			<div class="link"> <a href="mens.html">Men</a> </div>
			<div class="link"> <a href="womens.html">Women</a> </div>
			<div class="link"> <a href="#">User</a> </div>
			<div class="link"> <a href="cart.html">Cart</a> </div>
		`
	// <div class="link"> <a href="#">logout</a> </div>

}

const cartArr = JSON.parse(localStorage.getItem('cartArr')) || [];

function updateCart(cartArr) {
	localStorage.setItem('cartArr', JSON.stringify(cartArr))
}

function createCard(data) {

	let card = document.createElement('div')
	card.setAttribute('class', 'card')

	let img = document.createElement('img');
	let name = document.createElement('h4');
	let price = document.createElement('p');
	let button = document.createElement('button');

	img.src = data.image_url;
	name.innerText = data.name
	price.innerText = "$ " + data.price
	button.innerText = "Add to Cart"

	button.addEventListener('click', (e) => {
		let isFound = cartArr.find(elem => elem.id === data.id);
		if (isFound) {
			alert('product is already in cart')
		} else {
			cartArr.push({ ...data, quantity: 1 })
			updateCart(cartArr)
			alert('product added successfully')
		}
	})

	card.append(img, name, price, button)
	return card
}


function getTotalPrice() {
	let price = 0;
	cartArr.forEach(elem => price += elem.price * elem.quantity)
	return price
}

function getTotalItems() {
	let items = 0
	cartArr.forEach(elem => items += elem.quantity)
	return items
}
