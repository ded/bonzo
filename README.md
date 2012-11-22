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
### bonzo(elements)
`bonzo()` ...

------------------------------------------------
<a name="api-get"></a>
### bonzo().get(index)
`get()` ...

------------------------------------------------
<a name="api-each"></a>
### bonzo().each(fn[, scope])
`each()` ...

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
`html()` ...

------------------------------------------------
<a name="api-text"></a>
### bonzo().text([content])
`text()`

------------------------------------------------
<a name="api-addClass"></a>
### bonzo().addClass(class | classList)
`addClass()` ...

------------------------------------------------
<a name="api-removeClass"></a>
### bonzo().removeClass(class | classList)
`removeClass()` ...

------------------------------------------------
<a name="api-hasClass"></a>
### bonzo().hasClass(class | classList)
`hasClass()` ...

------------------------------------------------
<a name="api-toggleClass"></a>
### bonzo().toggleClass(class | classList)
`toggleClass()` ...

------------------------------------------------
<a name="api-show"></a>
### bonzo().show([type])
`show()` ...

------------------------------------------------
<a name="api-hide"></a>
### bonzo().hide()
`hide()` ...

------------------------------------------------
<a name="api-toggle"></a>
### bonzo().toggle([callback[, type]])
`toggle()` ...

------------------------------------------------
<a name="api-first"></a>
### bonzo().first()
`first()` ...

------------------------------------------------
<a name="api-last"></a>
### bonzo().last()
`last()` ...

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
`css()` ...

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
`attr()` ...

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
