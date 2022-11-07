const imageContainer = document.getElementById(
	"imageContainer"
) as HTMLElement;

import { applyPuzzleEffect } from "./applyPuzzleEffect";

applyPuzzleEffect(imageContainer, {
	columns: 10,
	rows: 8,
	spread: 200,
	speed: 1000,
	delay: 40,
	easing: "cubic-bezier(.2,.37,.49,.98)",
});
