document.addEventListener('DOMContentLoaded', printGood);

function printGood() {
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
		header_main.innerHTML = `<a href="../../main.html">MusicSoul</a> / <a href="goodsCatalog.html?${categoryType}">${categoryType}</a> / ${data[goodId]["type"] + " " + data[goodId]["title"]}`;
		good_img.src = data[goodId]["img"];
		price.innerText = data[goodId]["price"];
		producer.innerText += " " + data[goodId]["producer"];
		country.innerText += " " + data[goodId]["origin_country"];
		guarantee.innerText += " " + data[goodId]["guarantee"];

		data[goodId]["description"].forEach(elem => description.innerHTML += `<p>${elem}</p>`);
		description.innerHTML += '<p>Особенности:</p><ul class="features_list" id="features_list"></ul>';
		data[goodId]["features"].forEach(elem => features_list.innerHTML += `<li>${elem}</li>`);

		++goodId;

		for (let i = 1; i <= 4; i++) {
			goodId = (goodId + 1 === data.length + 1) ? 1 : goodId + 1;
			goods_catalog.innerHTML += `<div class="good">
						    				<a href="good.html?${categoryType}&good=${goodId}"><img src="${data[goodId - 1]["img"]}" alt="Товар" /></a>
						    				<p class="good_title"><a href="good.html?${categoryType}&good=${goodId}">${data[goodId - 1]["type"]} ${data[goodId - 1]["title"]}</a></p>
						    				<strong class="good_price"><span>${data[goodId - 1]["price"]}</span></strong>
						    			</div>`;
		}
	}
}

/*

<ul class="features_list" id="features_list">
</ul>
 */