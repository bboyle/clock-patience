/*! Clock patience - v0.0.5 - 2013-09-23
* https://github.com/bboyle/clock-patience
* Copyright (c) 2013 Ben Boyle; Licensed MIT */
function handleDragStart() {
	this.classList.add( 'dragging' );
}

var cards = document.querySelectorAll( '.card' );
[].forEach.call( cards, function( card ) {
	card.addEventListener( 'dragstart', handleDragStart, false );
});
