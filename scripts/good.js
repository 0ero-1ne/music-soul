document.addEventListener('DOMContentLoaded', printGood);
var good;

function printGood() {
	const queryTypes = ['drums','stringed','wind','keyboards','bowed','dj','folk','other'];
	const rusQueryTypes = ['Ударные','Струнные','Духовые','Клавишные','Смычковые','DJ','Народные','Прочее'];
	const search = window.location.search;
	const categoryType = search.slice(1, search.indexOf('&'));
	let goodId = +search.replace('?' + categoryType + '&good=', '') - 1;

	fetch(`http://localhost:3001/${categoryType}`)
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
		appendData(data);
	})
	.catch(function (err) {
		console.log('error: ' + err);
	});

	function appendData(data) {
		good = data[goodId];

		document.getElementById('add_basket').addEventListener('click', addBasket);
		document.head.querySelector('title').innerText = `MusicSoul - ${good["type"]} ${good["title"]}`;
		
		header_main.innerHTML = `<a href="../../main.html">MusicSoul</a> / <a href="catalog.html?${categoryType}">${rusQueryTypes[queryTypes.indexOf(categoryType)]}</a> / ${good["type"] + " " + good["title"]}`;
		good_img.src = good["img"];
		price.innerText = good["price"];
		producer.innerText += " " + good["producer"];
		country.innerText += " " + good["origin_country"];
		guarantee.innerText += " " + good["guarantee"];

		good["description"].forEach(elem => description.innerHTML += `<p>${elem}</p>`);
		description.innerHTML += '<p class="features_header">Особенности:</p><ul class="features_list" id="features_list"></ul>';
		good["features"].forEach(elem => features_list.innerHTML += `<li>${elem}</li>`);

		++goodId;

		for (let i = 1; i <= 4; i++) {
			goodId = (goodId + 1 === data.length + 1) ? 1 : goodId + 1;
			goods_catalog.innerHTML += `<div class="good">
    				<a href="good.html?${categoryType}&good=${data[goodId - 1]["id"]}">
    					<img src="${data[goodId - 1]["img"]}" alt="Picture" />
	    				<p class="good_title">${data[goodId - 1]["type"]} ${data[goodId - 1]["title"]}</p>
	    				<span class="good_price">${data[goodId - 1]["price"]}</span>
    				</a>
    			</div>
    		`;
		}
	}
}

function addBasket() {
	fetch(`http://localhost:3001/basket`)
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
		postGood(data);
	})
	.catch(function (err) {
		console.log('error: ' + err);
	});

	function postGood(data) {
		const basket = data;
		const body = {
			img: good["img"],
			title: good["title"],
			producer: good["producer"],
			origin_country: good["origin_country"],
			price: good["price"],
			item_of: good["item_of"],
			good_id: good["id"]
		};

		let alsoInBasket = false;

		basket.forEach(elem => {
			const objectOne = `${body["good_id"]} ${body["item_of"]}`;
			const objectTwo = `${elem["good_id"]} ${elem["item_of"]}`;

			if (JSON.stringify(objectOne) === JSON.stringify(objectTwo)) alsoInBasket = true;
		});

		if (!alsoInBasket)
		{
			let response = fetch('http://localhost:3001/basket', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify(body)
			});
			alert('Товар добавлен в корзину');
		}
		else
		{
			alert('Товар уже в корзине');
		}
	}
	
}

/*
let response = await fetch('http://localhost:3001/basket', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(user)
	})
 */