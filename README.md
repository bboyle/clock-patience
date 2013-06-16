Clock Patience web app
======================

This is a web app that will allow you to play [clock patience](http://en.wikipedia.org/wiki/Clock_patience).
It's a simple game. Wikipedia describe it as:

> This is a game of zero skill and is a purely mechanical process.
> The chances of winning are 1 in 13. There is no possible way to
> win the game if none of the bottommost cards in the twelve circle
> piles at the start of play is a king.

There's a bit of zen to it.

Visit the published app here: http://ultimate.benboyle.id.au/apps/clock-patience/

I'm building this app to learn more about writing apps for [Firefox OS](https://developer.mozilla.org/en/docs/Mozilla/Firefox_OS).


TODO
----

* UI design
  * -clock layout-
  * -symbols for suits (use Unicode)-
  * [cicada background](http://designfestival.com/the-cicada-principle-and-why-it-matters-to-web-designers/) for card backs/playing surface
  * flip over card (3D transform?)
* build system (grunt and compass)
* QA: syntax checking and tests
* drag and drop cards (partial)
* enforcing rules should be optional, play how you like
* auto play (like a cruise control)


What I've learned
-----------------

| Week | Notes                                                                                                                          |
|-----:|:-------------------------------------------------------------------------------------------------------------------------------|
|    1 | It's easy to make a Firefox OS app (way easier than a Firefox extension). Also, there are css at-rules for device orientation! |
|    2 | Drag and drop. There's more to it than you would initially think.                                                              |
|    3 | Implemented drag and drop, but in a separate project. Thinking of switching to jQuery UI `draggable` and `droppable`.          |
|    4 | CSS3 transforms for the clock patience layout. Takes a 12 column table and rotates each cell into a clock shape.               |
