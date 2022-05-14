document.addEventListener('DOMContentLoaded', printCatalog);

function printCatalog() {
	const search = window.location.search;
	const categoryType = (search.indexOf('&') === -1) ? search.replace('?','') : search.slice(1, search.indexOf('&'));
	const typeInstrument = (search.indexOf('&') === -1) ? '' : decodeURI(search.replace('?' + categoryType + '&type=', ''));
	console.log(typeInstrument);

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
		const wrapper = document.getElementById('goods_catalog');
		const filtersWrapper = document.getElementById('type_filters');
		let goods = data;
		goods = (typeInstrument !== "") ? goods.filter((elem) => elem["type"] === typeInstrument) : data;
		console.log(goods);

		main_header.innerHTML = `<a href="../../main.html">MusicSoul</a> / <a href="goodsCatalog.html?${categoryType}">${categoryType}</a>`;

		for (let i = 0; i < goods.length; i++) {
    		wrapper.innerHTML += `
    			<div class="good">
    				<a href="good.html?${categoryType}&good=${goods[i]["id"]}"><img src="${goods[i]["img"]}" alt="Picture" /></a>
    				<p class="good_title"><a href="good.html?${categoryType}&good=${goods[i]["id"]}">${goods[i]["type"]} ${goods[i]["title"]}</a></p>
    				<strong class="good_price"><span>${goods[i]["price"]}</span></strong>
    			</div>
    		`;
		}

    	const filters = data.map((elem) => {
			return elem["type"]; 
		});
		const typesOfInstruments = filters.filter((elem, pos) => {
			return filters.indexOf(elem) == pos;
		});

    	for (let i = 0; i < typesOfInstruments.length; i++) 
    		filtersWrapper.innerHTML += `<div class="filter">
    									<a href="goodsCatalog.html?${categoryType}&type=${typesOfInstruments[i]}">${typesOfInstruments[i]}</a>
								  </div>`;
	}
}

/*
<div class="good">
	<a href="good.html"><img src="https://musicmarket.by/images/thumbnails/460/460/detailed/4/9F67EF1AA1ED6A46900C2439F337ECC1_LRG.jpg.jpg" alt="Picture"></a>
	<p class="good_title"><a href="good.html">Ударная установка Peace Prodigy DP-109BK-22 White</a></p>
	<strong class="good_price"><span>1 920.00 руб./шт.</span></strong>
</div>
 */