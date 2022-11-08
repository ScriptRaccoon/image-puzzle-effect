# Image Puzzle Effect

Demo: https://puzzle-effect.netlify.app/

The file `src/applyPuzzleEffect.ts` provides a general function to apply a puzzle effect to a container containing an image. There are various options:

-   number of columns (pieces in x-direction), should divide image width
-   number of rows (pieces in y-direction), should divide image height
-   spread: the degree of randomness of the initial position
-   speed of the animation
-   delay for the individual pieces
-   easing function of the animation

The files `public/index.html` and `src/main.ts` demonstrate how to use the function.
