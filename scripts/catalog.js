document.addEventListener('DOMContentLoaded', printCatalog);

function printCatalog() {
	const queryTypes = ['drums','stringed','wind','keyboards','bowed','dj','folk','other'];
	const rusQueryTypes = ['Ударные','Струнные','Духовые','Клавишные','Смычковые','DJ','Народные','Прочее'];
	const search = window.location.search;
	const categoryType = (search.indexOf('&') === -1) ? search.replace('?','') : search.slice(1, search.indexOf('&'));
	const typeInstrument = (search.indexOf('&') === -1) ? '' : decodeURI(search.replace('?' + categoryType + '&type=', ''));
	document.head.querySelector('title').innerText = `MusicSoul - ${rusQueryTypes[queryTypes.indexOf(categoryType)]}`;

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

		main_header.innerHTML = `<a href="../../main.html">MusicSoul</a> / <a href="catalog.html?${categoryType}">${rusQueryTypes[queryTypes.indexOf(categoryType)]}</a>`;

		for (let i = 0; i < goods.length; i++) {
    		wrapper.innerHTML += `
    			<div class="good">
    				<a href="good.html?${categoryType}&good=${goods[i]["id"]}">
    					<img src="${goods[i]["img"]}" alt="Picture" />
	    				<p class="good_title">${goods[i]["type"]} ${goods[i]["title"]}</p>
	    				<span class="good_price">${goods[i]["price"]}</span>
    				</a>
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
    									<a href="catalog.html?${categoryType}&type=${typesOfInstruments[i]}">${typesOfInstruments[i]}</a>
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