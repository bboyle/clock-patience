/*! Clock patience - v0.0.6 - 2014-04-26
* https://github.com/bboyle/clock-patience
* Copyright (c) 2014 Ben Boyle; Licensed MIT */
function handleDragStart() {
	this.classList.add( 'dragging' );
}

var cards = document.querySelectorAll( '.card' );
[].forEach.call( cards, function ( card ) {
	card.addEventListener( 'dragstart', handleDragStart, false );
} );
