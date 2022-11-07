const imageContainer = document.getElementById(
	"imageContainer"
) as HTMLElement;

import { applyPuzzleEffect } from "./applyPuzzleEffect";

applyPuzzleEffect(imageContainer, {
	columns: 8,
	rows: 6,
	spread: 100,
	speed: 600,
	delay: 50,
	easing: "cubic-bezier(.2,.37,.49,.98)",
});
