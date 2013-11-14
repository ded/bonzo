Bonzo
-----

A library agnostic extensible DOM utility. Nothing else.

Bonzo is designed to live in any host library, such as [Ender](http://ender.jit.su), or simply as a stand-alone tool for the majority of your DOM-related tasks.

**It looks like this:**

``` js
bonzo(elements)
  .hide()
  .addClass('foo')
  .append('<p>the happs</p>')
  .css({
    color: 'red',
    'background-color': 'white'
  })
  .show()
```

--------------------------------------------------------

  * <a href="#useselector"><b>Use with a selector engine</b></a>
  * <a href="#extensions"><b>Bonzo extension API</b></a>
  * <a href="#api"><b>Complete Bonzo API</b></a>
  * <a href="#aboutname"><b>About the name "Bonzo"</b></a>
  * Contributing:
    - <a href="#building"><b>Building</b></a>
    - <a href="#tests"><b>Tests</b></a>
  * <a href="#browsers"><b>Browser support</b></a>
  * <a href="#ender"><b>Ender integration</b></a>
  * <a href="#contributors"><b>Contributors</b></a>
  * <a href="#licence"><b>Licence & copyright</b></a>

--------------------------------------------------------

<a name="useselector"></a>
Use with a selector engine
-----------------------------

A great way to use Bonzo is with a selector engine, like [Qwery](https://github.com/ded/qwery). You could wrap Bonzo up and augment your wrapper to inherit the same methods:

``` js
function $(selector) {
  return bonzo(qwery(selector));
}
```

This now allows you to write the following code:

``` js
$('#content a[rel~="bookmark"]').after('√').css('text-decoration', 'none');
```

See <a href="#api-setQueryEngine"><code>bonzo.setQueryEngine()</code></a> for more details.

<a name="extensions"></a>
Bonzo extension API
-------------------

One of the greatest parts about Bonzo is its simplicity to hook into the internal chain to create custom methods. For example you can create a method called `color()` like this:

``` js
bonzo.aug({
  color: function (c) {
    return this.css('color', c);
  }
})

// you can now do the following
$('p').color('aqua')
```

<a name="api"></a>
Complete Bonzo API
------------------

  * <a href="#api-ctor"><code>bonzo()</code></a>

<a name="instance"></a>
### Instance methods

  * <a href="#api-get"><code>bonzo().<b>get()</b></code></a>
  * <a href="#api-each"><code>bonzo().<b>each()</b></code></a>
  * <a href="#api-deepEach"><code>bonzo().<b>deepEach()</b></code></a>
  * <a href="#api-map"><code>bonzo().<b>map()</b></code></a>
  * <a href="#api-html"><code>bonzo().<b>html()</b></code></a>
  * <a href="#api-text"><code>bonzo().<b>text()</b></code></a>
  * <a href="#api-addClass"><code>bonzo().<b>addClass()</b></code></a>
  * <a href="#api-removeClass"><code>bonzo().<b>removeClass()</b></code></a>
  * <a href="#api-hasClass"><code>bonzo().<b>hasClass()</b></code></a>
  * <a href="#api-toggleClass"><code>bonzo().<b>toggleClass()</b></code></a>
  * <a href="#api-show"><code>bonzo().<b>show()</b></code></a>
  * <a href="#api-hide"><code>bonzo().<b>hide()</b></code></a>
  * <a href="#api-toggle"><code>bonzo().<b>toggle()</b></code></a>
  * <a href="#api-first"><code>bonzo().<b>first()</b></code></a>
  * <a href="#api-last"><code>bonzo().<b>last()</b></code></a>
  * <a href="#api-next"><code>bonzo().<b>next()</b></code></a>
  * <a href="#api-previous"><code>bonzo().<b>previous()</b></code></a>
  * <a href="#api-parent"><code>bonzo().<b>parent()</b></code></a>
  * <a href="#api-focus"><code>bonzo().<b>focus()</b></code></a>
  * <a href="#api-blur"><code>bonzo().<b>blur()</b></code></a>
  * <a href="#api-append"><code>bonzo().<b>append()</b></code></a>
  * <a href="#api-appendTo"><code>bonzo().<b>appendTo()</b></code></a>
  * <a href="#api-prepend"><code>bonzo().<b>prepend()</b></code></a>
  * <a href="#api-prependTo"><code>bonzo().<b>prependTo()</b></code></a>
  * <a href="#api-before"><code>bonzo().<b>before()</b></code></a>
  * <a href="#api-insertBefore"><code>bonzo().<b>insertBefore()</b></code></a>
  * <a href="#api-after"><code>bonzo().<b>after()</b></code></a>
  * <a href="#api-insertAfter"><code>bonzo().<b>insertAfter()</b></code></a>
  * <a href="#api-replaceWith"><code>bonzo().<b>replaceWith()</b></code></a>
  * <a href="#api-css"><code>bonzo().<b>css()</b></code></a>
  * <a href="#api-offset"><code>bonzo().<b>offset()</b></code></a>
  * <a href="#api-dim"><code>bonzo().<b>dim()</b></code></a>
  * <a href="#api-attr"><code>bonzo().<b>attr()</b></code></a>
  * <a href="#api-removeAttr"><code>bonzo().<b>removeAttr()</b></code></a>
  * <a href="#api-val"><code>bonzo().<b>val()</b></code></a>
  * <a href="#api-data"><code>bonzo().<b>data()</b></code></a>
  * <a href="#api-remove"><code>bonzo().<b>remove()</b></code></a>
  * <a href="#api-empty"><code>bonzo().<b>empty()</b></code></a>
  * <a href="#api-detach"><code>bonzo().<b>detach()</b></code></a>
  * <a href="#api-scrollLeft"><code>bonzo().<b>scrollLeft()</b></code></a>
  * <a href="#api-scrollTop"><code>bonzo().<b>scrollTop()</b></code></a>

<a name="static"></a>
### Static methods

  * <a href="#api-aug"><code>bonzo.<b>aug()</b></code></a>
  * <a href="#api-doc"><code>bonzo.<b>doc()</b></code></a>
  * <a href="#api-viewport"><code>bonzo.<b>viewport()</b></code></a>
  * <a href="#api-firstChild"><code>bonzo.<b>firstChild()</b></code></a>
  * <a href="#api-isAncestor"><code>bonzo.<b>isAncestor()</b></code></a>
  * <a href="#api-create"><code>bonzo.<b>create()</b></code></a>
  * <a href="#api-setQueryEngine"><code>bonzo.<b>setQueryEngine()</b></code></a>

Added in the Ender bridge:

  * <a href="#api-parents"><code>$().<b>parents()</b></code></a>
  * <a href="#api-closest"><code>$().<b>closest()</b></code></a>
  * <a href="#api-siblings"><code>$().<b>siblings()</b></code></a>
  * <a href="#api-children"><code>$().<b>children()</b></code></a>
  * <a href="#api-width"><code>$().<b>width()</b></code></a>
  * <a href="#api-height"><code>$().<b>height()</b></code></a>


------------------------------------------------
<a name="api-ctor"></a>
### bonzo(DOMElement | ArrayLikeDOMElementCollection)
Factory function for bonzo objects. Takes in either a single `DOMElement`, or an array-like object or array of them. Returns an array-like `Bonzo` object possessing all of the [instance methods](#instance) documented below.
```js
var elem = document.getElementById('foo');
var $elem = bonzo(elem);
// $elem now has all the special powers listed below...
```

------------------------------------------------
<a name="api-get"></a>
### bonzo().get(index)
Returns the raw `DOMElement` held at `index`. Because Bonzo objects are array-like, this is identical to saying `bonzo()[index]`.
```js
var elem = document.getElementById('bar');
var $elem = bonzo(elem);
var sameElem = $elem.get(0);
var sameElemAgain = $elem[0];
// elem === sameElem && sameElem === sameElemAgain
```

------------------------------------------------
<a name="api-each"></a>
### bonzo().each(fn[, scope])
Allows you to iterate over the raw elements contained in `bonzo` collections. `fn` gets called once for each element in the collection, with each element, in turn, as its first argument.  If the optional `scope` argument is supplied, then it is used as the `this` value of the function. Otherwise, the same element that is passed as the first argument is used.  The index of the element is passed as the second argument, and the collection itself is passed as the third.

------------------------------------------------
<a name="api-deepEach"></a>
### bonzo().deepEach(fn[, scope])
`deepEach()` ...

------------------------------------------------
<a name="api-map"></a>
### bonzo().map(fn[, rejectFn])
`map()` ...

------------------------------------------------
<a name="api-html"></a>
### bonzo().html([content])

`bonzo.html()` either sets or gets the elements' `innerHTML` to `content`, depending if the optional `content` argument is pased in. If called without the argument, `.html()` returns the element's `innerHTML`.

* `content` is an *optional* argument. If it is passed in, it will **set** the `innerHTML` of a given element and return a `Bonzo` object.

#### Examples

```js
bonzo(element).html('<p>foo</p>');
bonzo(element).html(); // <p>foo</p>
```

------------------------------------------------
<a name="api-text"></a>
### bonzo().text([content])

`bonzo.text()` is very similar to [`.html`](#api-html), but uses the elements` `textContent` instead of `innerHTML` when setting the `content`. Thus, the `content` will not get parsed as markup.

This method either **gets** or **sets** the text of a given element, depending if the optional *content* argument is passed in.

* `content` is an *optional* argument. If it is passed in, it will **set** the text value of a given element and return a `Bonzo` object.

If no `content` is specified, the `.text()` method will return the text that makes up that element.

If the element has children (i.e. a `ul` containing several `li` children), the children's text is included in the return value.

#### Examples

``` js
bonzo("<h1>hello, world</h1>").text()
  // →  returns "hello, world"

bonzo("<h1>i'm going to change</h1>").text("changed you!")
  // the <h1> now says "changed you!"
  // →  returns a Bonzo object

bonzo("<ul><li>one</li><li>two</li></ul>").text()
  // →  returns "one
  // two"

bonzo("<ul><li>one</li><li>two</li></ul>").text('hello')
  // the html is now <ul>hello</ul>
  // →  returns a Bonzo object
```

------------------------------------------------
<a name="api-addClass"></a>
### bonzo().addClass(class | classList)

`bonzo.addClass(class | classList)` adds the specified `class` to the given element. It returns a `Bonzo` object.

* `class` is a *required* argument. It is the name of the class you wish to add to the given element.

  * If you'd like to add multiple classes at once, simply use a
space-separated string, a `classList` (i.e. "classOne classTwo").

#### Examples

``` js
bonzo("<h1>hello, world</h1>").addClass('big')
  // the html is now <h1 class="big">hello, world</h1>
  // →  returns a Bonzo object

bonzo("<h1>hello, world</h1>").addClass()
  //  throws an error, since the argument is required

bonzo("<p>i want lots of classes</p>").addClass("one two three")
  // the html is now <p class="one two three">i want lots of classes</p>
  // →  returns a Bonzo object
```


------------------------------------------------
<a name="api-removeClass"></a>
### bonzo().removeClass(class | classList)

`bonzo.removeClass(class)` removes the specified `class` from the given element. It returns a `Bonzo` object.

* `class` is a *required* argument. It is the name of the class you wish to remove from the given element.

  * If you'd like to remove multiple classes at once, simply use a
space-separated string, a `classList` (i.e. "classOne classTwo").

#### Examples

``` js
bonzo("<h1 class='small'>hello, world</h1>").removeClass('small')
  // the html is now <h1 class>hello, world</h1>
  // →  returns a Bonzo object

bonzo("<h1 class='removeMe'>hello, world</h1>").removeClass()
  //  throws an error, since the argument is required

bonzo("<p class='one two three'>i have lots of classes</p>").removeClass("one two three")
  // the html is now <p>i have lots of classes</p>
  // →  returns a Bonzo object

bonzo("<h1 class='error'>hello, world</h1>").removeClass('does_not_exist')
  // →  since the argument does not match a classlist the <h1> has, nothing happens and a Bonzo object is returned
```

------------------------------------------------
<a name="api-hasClass"></a>
### bonzo().hasClass(class | classList)

`bonzo.hasClass(class)` returns **true** or **false**, based on whether
or not the specified element has a given *class*. It returns **true** if
the specified element *does* have the `class`, and returns **false** if
the specified element **does not** have the `class`.

* `class` is a *required* argument. It is the name of the class you wish to check for in a given element.

  * **NOTE**: if you pass in a space-separated `classList` like you can
in <a href="#api-addClass">addClass</a> and <a
href="#api-removeClass">removeClass</a>, this method will return
**true** if **any** of the space-separated `classList` classes are present in the element.

#### Examples

``` js

bonzo("<p class='alert'>something went wrong</p>").hasClass('alert')
  // →  returns true

bonzo("<p class='alert'>something went wrong</p>").hasClass('normal')
  // →  returns false

bonzo("<p class='one'>something went wrong</p>").hasClass('one two three')
  // →  returns true

bonzo("<p class='one'>something went wrong</p>").hasClass('three two one')
  // →  returns true

bonzo("<p class='large'>something went wrong</p>").hasClass('small tiny')
  // →  returns false

```

------------------------------------------------
<a name="api-toggleClass"></a>
### bonzo().toggleClass(class | classList)

`bonzo.toggleClass(class)` either adds or removes a specified `class` to the given element, depending on whether or not the given element already has a class with that `class` or not.

If the element **does** have a class named `class`, calling `toggleClass()` will **remove** the `class` class from it. If the element **does not** have a class with the specified `class`, calling `toggleClass()` will **add** a class with that `class`.

* `class` is a *required* argument. It is the name of the class you wish to toggle.

  * If you'd like to toggle multiple classes at once, simply use a
space-separated string, a `classList` (i.e. "classOne classTwo").


#### Examples

``` js

bonzo("<p class='alert'>something went wrong</p>").toggleClass('alert')
  // the html is now <p class>something went wrong</p>
  // →  returns a Bonzo object

bonzo("<p class='alert'>something went wrong</p>").toggleClass('different')
  // the html is now <p class="alert different">something went wrong</p>
  // →  returns a Bonzo object

bonzo("<p class='one'>something went wrong</p>").toggleClass('three two one')
  // the html is now <p class="three two">something went wrong</p>
  // →  returns a Bonzo object

bonzo("<p class='large'>something went wrong</p>").toggleClass('small tiny')
  // the html is now <p class="small tiny large">something went wrong</p>
  // →  returns a Bonzo object

```

------------------------------------------------
<a name="api-show"></a>
### bonzo().show([type])

`bonzo.show()` sets a given element or set of elements' `display` style property. By passing in an optional `type` argument, you can specify the attribute of the `display` property Bonzo gives the element(s).

* `type` is an *optional* argument. It is the display type you wish to
utilize.

If you specify an unsupported `type` (i.e. something other than `block`, `compact`, `inline-block`, `inline`, `inline-table`, `list-item`, `run-in`, `table`, `table-caption`, `table-cell`, `table-column`, `table-column-group`, `table-footer-group`, `table-header-group`, `table-row`, or `table-row-group`), Bonzo will ignore the invalid `type`.

#### Examples

``` js

bonzo("<p style=\"display: none;\">I was hidden</p>").show()
  // html is now <p style>I was hidden</p>
  // →  returns a Bonzo object

bonzo("<p style=\"display: none;\">I was hidden</p>").show('inline-block')
  // html is now <p style="display: inline-block;">I was hidden</p>
  // →  returns a Bonzo object

```

------------------------------------------------
<a name="api-hide"></a>
### bonzo().hide()

`bonzo.hide()` adds a `display: none;` to the specified element.

#### Examples

``` js

bonzo("<p>Hello, world</p>").hide()
  // html is now <p style="display: none;">Hello, world</p>
  // →  returns a Bonzo object

```

------------------------------------------------
<a name="api-toggle"></a>
### bonzo().toggle([callback[, type]])
`toggle()` ...

------------------------------------------------
<a name="api-first"></a>
### bonzo().first()

`bonzo.first()` returns a Bonzo object referencing the first element in a set of elements. If the set is empty, the a Bonzo object will still be returned, but it won't contain any children.

#### Examples

``` js

var firstItem = bonzo("<li>one</li><li>two</li><li>three</li>").first()
firstItem.text() // "one"
firstItem.length // 1
  // →  returns a Bonzo object

var el = bonzo("").first()
el.text() // ""
el.length // 0
  // →  returns a Bonzo object
```

------------------------------------------------
<a name="api-last"></a>
### bonzo().last()

`bonzo.last()` returns a Bonzo object referencing the last element in a set of elements. If the set is empty, the a Bonzo object will still be returned, but it won't contain any children.

#### Examples

``` js

var lastItem = bonzo("<li>one</li><li>two</li><li>three</li>").last()
lastItem.text() // "three"
lastItem.length // 1
  // →  returns a Bonzo object

var el = bonzo("").last()
el.text() // ""
el.length // 0
  // →  returns a Bonzo object
```

------------------------------------------------
<a name="api-next"></a>
### bonzo().next()
`next()` ...

------------------------------------------------
<a name="api-previous"></a>
### bonzo().previous()
`previous()` ...

------------------------------------------------
<a name="api-parent"></a>
### bonzo().parent()
`parent()` ...

------------------------------------------------
<a name="api-focus"></a>
### bonzo().focus()
`focus()` ...

------------------------------------------------
<a name="api-blur"></a>
### bonzo().blur()
`blur()` ...

------------------------------------------------
<a name="api-append"></a>
### bonzo().append(html | element | collection)
`append()` ...

------------------------------------------------
<a name="api-appendTo"></a>
### bonzo().appendTo(target)
`appendTo()` ...

------------------------------------------------
<a name="api-prepend"></a>
### bonzo().prepend(html | element | collection)
`prepend()` ...

------------------------------------------------
<a name="api-prependTo"></a>
### bonzo().prependTo(target)
`prependTo()` ...

------------------------------------------------
<a name="api-before"></a>
### bonzo().before(html | element | collection)
`before()` ...

------------------------------------------------
<a name="api-insertBefore"></a>
### bonzo().insertBefore(target)
`insertBefore()` ...

------------------------------------------------
<a name="api-after"></a>
### bonzo().after(html | element | collection)
`after()` ...

------------------------------------------------
<a name="api-insertAfter"></a>
### bonzo().insertAfter(target)
`insertAfter()` ...

------------------------------------------------
<a name="api-replaceWith"></a>
### bonzo().replaceWith(html | element | collection)
`replaceWith()` ...

------------------------------------------------
<a name="api-css"></a>
### bonzo().css(property | hash[, value])
Sets or returns CSS properties of the element. If a single string argument is passed, then the value of that CSS property is returned. If two string arguments are passed, the CSS property specified by the first is set to the value specified by the second. If a single hash argument is passed, then the CSS property corresponding to each property is set to the value designated by the hash property's value.
```js
bonzo(elem).css({
  background: 'blue',
  color: green;
}).css('border', '2px solid red').css('color'); // "green"
```

------------------------------------------------
<a name="api-offset"></a>
### bonzo().offset([ x, y ] | [ hash ])
`offset()` ...

------------------------------------------------
<a name="api-dim"></a>
### bonzo().dim()
`dim()` ...

------------------------------------------------
<a name="api-attr"></a>
### bonzo().attr(key[, value] | hash)
Sets or returns attributes of the element. If the first argument is a hash, then each property of the hash is read and the corresponding attribute of the element is set to the hash property's value. If the first argument is a string and no second argument is provided, the value of the element's attribute with the same name is returned. If a second argument *is* supplied, then the element's attribute of the same name as the first argument is set to the value of the second argument.

------------------------------------------------
<a name="api-removeAttr"></a>
### bonzo().removeAttr(key)
`removeAttr()` ...

------------------------------------------------
<a name="api-val"></a>
### bonzo().val([ value ])
`val()` ...

------------------------------------------------
<a name="api-data"></a>
### bonzo().data([ key[, value ] ] | [ hash ])
`data()` ...

------------------------------------------------
<a name="api-remove"></a>
### bonzo().remove()
`remove()` ...

------------------------------------------------
<a name="api-empty"></a>
### bonzo().empty()
`empty()` ...

------------------------------------------------
<a name="api-detach"></a>
### bonzo().detach()
`detach()` ...

------------------------------------------------
<a name="api-scrollLeft"></a>
### bonzo().scrollLeft([ x ])
`scrollLeft()` ...

------------------------------------------------
<a name="api-scrollTop"></a>
### bonzo().scrollTop([ y ]
`scrollTop()` ...

------------------------------------------------
<a name="api-aug"></a>
### bonzo.aug(hash)
`aug()` ...

------------------------------------------------
<a name="api-doc"></a>
### bonzo.doc()
`doc()` ...

------------------------------------------------
<a name="api-viewport"></a>
### bonzo.viewport()
`viewport()` ...

------------------------------------------------
<a name="api-firstChild"></a>
### bonzo.firstChild(element)
`firstChild()` ...

------------------------------------------------
<a name="api-isAncestor"></a>
### bonzo.isAncestor(container, element)
`isAncestor()` ...

------------------------------------------------
<a name="api-create"></a>
### bonzo.create(container, element)
`create()` ...

------------------------------------------------
<a name="api-parents"></a>
### $().parents()
`parents()` ...

------------------------------------------------
<a name="api-setQueryEngine"></a>
### bonzo.setQueryEngine(engine)
`setQueryEngine()` ...

***TODO*** more here

For the insertion methods you can set a query selector host:

``` js
bonzo.setQueryEngine(qwery)
bonzo(bonzo.create('<div>')).insertAfter('.boosh a')
```

------------------------------------------------
<a name="api-closest"></a>
### $().closest()
`closest()` ...

------------------------------------------------
<a name="api-siblings"></a>
### $().siblings()
`siblings()` ...

------------------------------------------------
<a name="api-children"></a>
### $().children()
`children()` ...

------------------------------------------------
<a name="api-width"></a>
### $().width([ value ])
`width()` ...

------------------------------------------------
<a name="api-height"></a>
### $().height([ value ])
`height()` ...

------------------------------------------------


<a name="aboutname"></a>
About the name "Bonzo"
----------------------
*Bonzo Madrid* was a malicious battle school commander of whom eventually is killed by [Ender Wiggin](http://en.wikipedia.org/wiki/Ender_Wiggin). Bonzo represents the DOM, of whom we'd all love to slay.

<a name="contributing"></a>
Contributing
------------

You should only edit the files in the *src/* directory. Bonzo is compiled into the *bonzo.js* and *bonzo.min.js* files contained in the root directory by the build command:

<a name="building"></a>
### Building

```sh
$ npm install
$ make
```

<a name="tests"></a>
### Tests

Point your test browser(s) to *tests/tests.html*, or:

```sh
$ open tests/tests.html
```

Please try to include tests or adjustments to existing tests with all non-trivial contributions.

<a name="browsers"></a>
Browser support
---------------

  * IE6+
  * Chrome
  * Safari 4+
  * Firefox 3.5+
  * Opera

<a name="ender"></a>
Ender integration
-----------------

Bonzo is a registered npm package and fits in nicely with the [Ender](http://ender.no.de) framework. If you don't have Ender, you should install now, and never look back, *ever*. As a side note the *query engine host* is set for you when you include it with Ender.

```sh
$ npm install ender -g
```

To combine Bonzo to your Ender build, you can add it as such:

```sh
$ ender build bonzo[ package-b[ package-c ...]]
```

or, add it to your existing ender package
https://github.com/rvagg/bonzo/edit/docs-api/README.md#
```sh
$ ender add bonzo
```

Bonzo is included in [The Jeesh](http://ender.jit.su/#jeesh), Ender's "starter-pack", when you `ender build jeesh` you'll get Bonzo and some other amazing libraries that'll make working in the browser a breeze. See the [Ender documentation](http://ender.jit.su/) for more details.

<a name="contributors"></a>
Contributors
------------

  * [Dustin Diaz](https://github.com/ded/bonzo/commits/master?author=ded)
  * [Rod Vagg](https://github.com/ded/bonzo/commits/master?author=rvagg)
  * [Jacob Thornton](https://github.com/ded/bonzo/commits/master?author=fat)

<a name="licence"></a>
Licence & copyright
-------------------

Bonzo is Copyright &copy; 2012 Dustin Diaz [@ded](https://twitter.com/ded) and licensed under the MIT licence. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE file for more details.
