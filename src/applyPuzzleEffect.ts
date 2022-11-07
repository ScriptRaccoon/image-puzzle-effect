export function applyPuzzleEffect(
	container: HTMLElement,
	options: {
		x: number;
		y: number;
		speed: number;
		delay: number;
		spread: number;
		easing: string;
	}
) {
	if (!container) {
		return console.error("No container was found");
	}

	const img = container.querySelector("img");
	if (!img) {
		return console.error("Could not find image");
	}

	const { x, y, speed, delay, spread, easing } = options;

	if (
		x <= 0 ||
		y <= 0 ||
		x != Math.floor(x) ||
		y != Math.floor(y)
	) {
		return console.error(
			"Only positive integers are allowed for x,y"
		);
	}

	container.style.position = "relative";
	img.style.opacity = "0";

	const generatePieces = () => {
		for (let j = 0; j < y; j++) {
			for (let i = 0; i < x; i++) {
				const correctX = (i / x) * img.width;
				const correctY = (j / y) * img.height;
				const randomX =
					correctX + (2 * Math.random() - 1) * spread;
				const randomY =
					correctY + (2 * Math.random() - 1) * spread;

				const piece = document.createElement("div");
				piece.classList.add("piece");

				piece.style.position = "absolute";
				piece.style.width = `${img.width / x}px`;
				piece.style.height = `${img.height / y}px`;
				piece.style.left = piece.style.top = "0px";
				piece.style.opacity = "0";
				piece.style.transform = `translate(${randomX}px,${randomY}px)`;
				piece.style.transition =
					`transform ${speed}ms ${easing},` +
					`opacity ${speed}ms ${easing}`;

				container.appendChild(piece);

				piece.style.backgroundImage = `url(${img.src})`;
				piece.style.backgroundPositionX = `-${correctX}px`;
				piece.style.backgroundPositionY = `-${correctY}px`;

				setTimeout(() => {
					piece.style.opacity = "1";
					piece.style.transform = `translate(${correctX}px,${correctY}px)`;
				}, delay * (j * x + i));
			}
		}
	};

	const removePieces = () => {
		const duration = delay * (y * x - 1) + speed + 100;
		setTimeout(() => {
			img.style.opacity = "1";
			container
				.querySelectorAll(".piece")
				.forEach((piece) => piece.remove());
		}, duration);
	};

	img.onload = () => {
		generatePieces();
		removePieces();
	};
}
