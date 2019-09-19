## Lab 4: Introduction to d3.js

#### Big idea

The big idea of D3 is that you are binding data to DOM elements. When data change, you can have three conditions:

- enter: new DOM elements that need to be drawn because of new data
- update: DOM elements that are already drawn, and are still in the data
- exit: DOM elements that need to be removed because they are no longer in the data

#### Documentation

D3 has extensive documentation. If you aren't sure about something, that should be the first place you look: https://github.com/d3/d3/blob/master/API.md.

#### Other modules

In addition to its core data-binding functionality, d3 now has many modules with utilities for data manipulation (`d3-array`), colors (`d3-color`), mapping (`d3-geo`), formatting numbers and dates (`d3-format`, `d3-time-format`), scheduling events in JS (`d3-timer`), calling APIs (`d3-fetch`), and much more.

#### D3 + SVG

Remember that D3 is **not** the same as SVG. You can use D3 with other HTML elements, and you can draw SVG without D3. However, the combination is very powerful because SVG is so customizable and D3 makes it easy to draw and update them programatically. If you aren't sure about what SVG elements there are, or what attributes they take, consult the SVG documentation: https://developer.mozilla.org/en-US/docs/Web/SVG.

#### bl.ocks and Observable

Both of these platforms were created by Mike Bostock, the creator of D3. Bl.ocks (bl.ocks.org) are built on top of Github Gists and are basically obsolete thanks to Observable, but you may still find many useful examples there. Observable (https://observablehq.com) is a dynamic coding notebook that allows faster iteration among many features, and you'll find newer examples there. Neither platform is limited to D3 -- you can use them for any JavaScript exploration.
