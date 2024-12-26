const data = await (await fetch("https://raw.githubusercontent.com/chase-manning/pokemon-tcg-pocket-cards/refs/heads/main/v2.json")).json();
let forceRarePack = false;

function randomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function openPack(name) {
	const cards = data.filter(card => card.pack == name);
	let pack = [];

	const getOfRarity = (rarity) => {
		const ofRarity = cards.filter(card => card.rarity == rarity);

		pack.push(ofRarity[randomInteger(0, ofRarity.length - 1)]);
	}

	const packRarity = Math.random() * 100;

	if (!forceRarePack && packRarity > .05) {
		// cards 1-3
		for (let i = 0; i < 3; i++) {
			getOfRarity("Common");
		}

		let card4 = Math.random() * 100;
		if (card4 < 90) {
			getOfRarity("Uncommon");
		}
		else {
			card4 -= 90;
			if (card4 < 5) {
				getOfRarity("Rare");
			}
			else {
				card4 -= 5;
				if (card4 < 1.666) {
					getOfRarity("Rare EX");
				}
				else {
					card4 -= 1.666;
					if (card4 < 2.572) {
						getOfRarity("Full Art");
					}
					else {
						card4 -= 2.572;
						if (card4 < .5) {
							getOfRarity("Full Art EX/Support");
						}
						else {
							card4 -= .5;
							if (card4 < .222) {
								getOfRarity("Immersive");
							}
							else {
								getOfRarity("Gold Crown");
							}
						}
					}
				}
			}
		}

		let card5 = Math.random() * 100;
		if (card5 < 60) {
			getOfRarity("Uncommon");
		}
		else {
			card5 -= 60;
			if (card5 < 20) {
				getOfRarity("Rare");
			}
			else {
				card5 -= 20;
				if (card5 < 6.664) {
					getOfRarity("Rare EX");
				}
				else {
					card5 -= 6.664;
					if (card5 < 10.288) {
						getOfRarity("Full Art");
					}
					else {
						card5 -= 10.288;
						if (card5 < 2) {
							getOfRarity("Full Art EX/Support");
						}
						else {
							card5 -= 2;
							if (card5 < .888) {
								getOfRarity("Immersive");
							}
							else {
								getOfRarity("Gold Crown");
							}
						}
					}
				}
			}
		}
	}
	else {
		for (let i = 0; i < 5; i++) {
			let n = Math.random() * 100;

			if (n < 42.105) {
				getOfRarity("Full Art");
			}
			else {
				n -= 42.105;
				if (n < 47.368) {
					getOfRarity("Full Art EX/Support");
				}
				else {
					n -= 47.368;
					if (n < 5.263) {
						getOfRarity("Immersive");
					}
					else {
						getOfRarity("Gold Crown");
					}
				}
			}
		}
	}

	return pack;
}

function showPack(pack) {
	let viewer = document.querySelector("#packviewer");
	viewer.innerHTML = "";

	let p = document.createElement("p");
	let packNo = 0 + localStorage.getItem("packNo");
	if (isNaN(packNo)) packNo = 0;
	packNo++;
	p.innerHTML =`pack no. ${packNo}`;
	viewer.appendChild(p);
	localStorage.setItem("packNo", packNo.toString());

	pack.forEach(card => {
		let img = document.createElement("img");
		img.src = card.image;
		viewer.appendChild(img);
	})
}

document.querySelector("#mewtwo").onclick = () => showPack(openPack("Mewtwo"));
document.querySelector("#pikachu").onclick = () => showPack(openPack("Pikachu"));
document.querySelector("#charizard").onclick = () => showPack(openPack("Charizard"));
document.querySelector("#mew").onclick = () => showPack(openPack("Mythical Island"));

document.querySelector("#forcerarepack").oninput = () => forceRarePack = !forceRarePack;
