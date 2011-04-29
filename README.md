Bonzo
-----
a simple, to the point, hassle-free, small (2.8k), library agnostic, extensible DOM utility. Nothing else.
Bonzo is designed to live in any host library, or simply as a stand-alone tool for the majority of your DOM-related tasks.

<h3>It looks like this</h3>

    bonzo(elements)
      .hide()
      .addClass('foo')
      .append('<p>the happs</p>')
      .css({
        color: 'red',
        'background-color': 'white'
      })
      .show()

Paired with a Selector Engine
-----------------------------
A great way to use Bonzo is with a selector engine (like [Qwery](https://github.com/ded/qwery) for example). You could wrap bonzo up and augment your wrapper to inherit the same methods. That looks like this:

    function $(selector) {
      return bonzo(qwery(selector));
    }

    bonzo.aug(bonzo, $);

This now allows you to write the following code:

    $('#content a[rel~="bookmark"]').after('√').css('text-decoration', 'none');

Bonzo Extension API
-------------------
One of the greatest parts about Bonzo is its simplicity to hook into the internal chain to create custom methods. For example you can create a method called **color** like this:

    bonzo.aug({
      color: function (c) {
        this.css('color', c);
      }
    });

    // you can now do the following
    $('p').color('aqua');

All other API methods
---------------------

  * each
    - function (element, index)
  * map
    - function (element, index)
    - reject
  * html
    - html() get
    - html(str) set
  * addClass
  * removeClass
  * hasClass
  * show
  * hide
  * first
  * last
  * next
  * previous
  * append
  * appendTo(target)
  * prepend
  * prependTo(target)
  * before
  * insertBefore(target)
  * after
  * insertAfter(target)
  * css
    - css(prop, val)
    - css({properties})
  * offset()
    - top
    - left
    - width
    - height
  * attr
    - attr(k) get
    - attr(k, v) set
  * remove
  * empty
  * detach
  * scrollLeft
  * scrollTop
  * serialize(form)
  * serializeArray(form)
  * bonzo.aug({ properties })
  * bonzo.doc()
    - width
    - height
  * bonzo.viewport()
    - width
    - height
  * bonzo.isAncestor(container, child)
  * bonzo.noConflict

Added in the Ender bridge

  * parents(selector)

The name Bonzo
--------------
Bonzo Madrid was a malicious battle school commander of whom eventually is killed by [Ender Wiggin](http://en.wikipedia.org/wiki/Ender_Wiggin). Bonzo represents the DOM, of whom we'd all love to slay.

Building
--------
Aside from simply downloading the source, if you would like to contribute, building Bonzo requires GNU 'make' and Node >= 0.4, and of course, git. The rest is easy:

    git clone git://github.com/ded/bonzo.git
    cd bonzo
    git submodule update --init
    make

*make* will run the [JSHint](http://jshint.com) linter as well as the [Uglify](https://github.com/mishoo/UglifyJS) compliler.

Tests
-----

    open bonzo/tests/tests.html

Ender integration
----------
Bonzo is a registered npm package and fits in nicely with the [Ender](http://ender.no.de) framework. If you don't have Ender, you should install now, and never look back, ever.

    $ npm install ender

On the NPM release candidate?

    $ npm install ender -g

To combine Bonzo to your Ender build, you can add it as such:

    $ ender build bonzo[,modb, modc,...]

or, add it to your existing ender package

    $ ender add bonzo

Contributors
-----

  * [Dustin Diaz](https://github.com/ded/bonzo/commits/master?author=ded)
  * [Jacob Thornton](https://github.com/ded/bonzo/commits/master?author=fat)
