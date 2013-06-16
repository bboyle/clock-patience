function handleDragStart() {
	this.classList.add( 'dragging' );
}

var cards = document.querySelectorAll( '.card' );
[].forEach.call( cards, function( card ) {
	card.addEventListener( 'dragstart', handleDragStart, false );
});
