/*! Clock patience - v0.0.3 - 2013-06-16
* Copyright (c) 2013 ; Licensed  */
function handleDragStart() {
	this.classList.add( 'dragging' );
}

var cards = document.querySelectorAll( '.card' );
[].forEach.call( cards, function( card ) {
	card.addEventListener( 'dragstart', handleDragStart, false );
});
