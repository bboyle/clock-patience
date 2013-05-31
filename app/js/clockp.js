function handleDragStart( e ) {
	this.style.opacity = '0.4';  // this / e.target is the source node.
	this.style.cursor = '-moz-grabbing';
}

var cards = document.querySelectorAll( '.card' );
[].forEach.call( cards, function( card ) {
	card.addEventListener( 'dragstart', handleDragStart, false );
});
