document.addEventListener('DOMContentLoaded', printWishlist);

function printWishlist() {
	fetch(`http://localhost:3001/wishlist`)
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
		const wrapper = document.getElementById('goods');

		for (let i = 0; i < data.length; i++) {
    		wrapper.innerHTML += `
    			<div class="good" id="${data[i]["id"]}">
					<a href="good.html?${data[i]["item_of"]}&good=${data[i]["good_id"]}">
						<img src="${data[i]["img"]}" alt="Товар" id="good_img">
						<div class="description">
							<p id="good_title">${data[i]["title"]}</p>
							<p id="producer">Производитель: ${data[i]["producer"]}</p>
							<p id="country">Страна-производитель: ${data[i]["origin_country"]}</p>
							<p id="guarantee">Гарантия: ${data[i]["guarantee"]}</p>
							<p id="price">${data[i]["price"]}</p>
						</div>
					</a>
					<div id="delete_good" onclick="deleteGood(event)">Удалить</div>
				</div>
    		`;
		}

		wrapper.innerHTML += "<div class='shopping_button'><a href='../../main.html'>Вперёд за покупками</a></div>";

		return;
	}
}

function deleteGood(event) {
	const answer = confirm("Вы точно желаете удалить товар?");
	const goodId = event.target.parentNode.id;

	if (answer) {
		let response = fetch(`http://localhost:3001/wishlist/${goodId}`, {
			method: 'DELETE'
		});
		alert('Товар удалён из избранных');
		document.location.reload();
	}
}

/*
<div class="good" id="good">
	<a href="">
		<img src="https://musicmarket.by/images/thumbnails/460/460/detailed/4/9F67EF1AA1ED6A46900C2439F337ECC1_LRG.jpg.jpg" alt="Товар" id="good_img">
		<div class="description">
			<p id="good_title">Title</p>
			<p id="producer">Производитель:</p>
			<p id="country">Страна-производитель:</p>
			<p id="guarantee">Гарантия:</p>
			<p id="price">2000</p>
		</div>
	</a>
</div>
 */