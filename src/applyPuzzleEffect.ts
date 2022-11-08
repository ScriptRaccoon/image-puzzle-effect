export function applyPuzzleEffect(
	container: HTMLElement,
	options: {
		columns: number;
		rows: number;
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

	const { columns, rows, speed, delay, spread, easing } = options;

	if (
		columns <= 0 ||
		rows <= 0 ||
		columns != Math.floor(columns) ||
		rows != Math.floor(rows)
	) {
		return console.error(
			"Only positive integers are allowed for columns and rows"
		);
	}

	container.style.position = "relative";
	img.style.opacity = "0";

	const generatePieces = () => {
		for (let y = 0; y < rows; y++) {
			for (let x = 0; x < columns; x++) {
				const correctX = (x / columns) * img.width;
				const correctY = (y / rows) * img.height;
				const randomX =
					correctX + (2 * Math.random() - 1) * spread;
				const randomY =
					correctY + (2 * Math.random() - 1) * spread;

				const piece = document.createElement("div");
				piece.classList.add("piece");

				piece.style.position = "absolute";
				piece.style.width = `${img.width / columns}px`;
				piece.style.height = `${img.height / rows}px`;
				piece.style.left = piece.style.top = "0px";
				piece.style.opacity = "0";
				piece.style.transform = `translate(${randomX}px,${randomY}px)`;
				piece.style.transition =
					`transform ${speed}ms ${easing},` +
					`opacity ${speed}ms ${easing}`;

				piece.style.backgroundImage = `url(${img.src})`;
				piece.style.backgroundPositionX = `-${correctX}px`;
				piece.style.backgroundPositionY = `-${correctY}px`;

				container.appendChild(piece);

				setTimeout(() => {
					piece.style.opacity = "1";
					piece.style.transform = `translate(${correctX}px,${correctY}px)`;
				}, delay * (y * columns + x));
			}
		}
	};

	const removePieces = () => {
		const duration = delay * (rows * columns - 1) + speed + 100;
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
