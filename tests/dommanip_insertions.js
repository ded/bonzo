/*global sink:true start:true Q:true dom:true $:true bowser:true ender:true*/

sink('DOM Manipulation - insertions', function(test, ok, before, after, assert) {

  /* Return an tree/object representing the node and its children.
   * both 'id' and 'clazz' (className) properties will be set where they are
   * present on the node and a 'children' array will be set up recursively for
   * any child nodes.
   * For doing a simple assert.equal(actual, expected) to make sure that what
   * we have in the DOM is what we expect without making the tests too hard to
   * read and too complex.
   */
  var simpleNodeSerialize = function (node) {
        var i = 0, res = {}
        if (node.className) res.clazz = node.className
        if (node.id) res.id = node.id
        if (node.childNodes.length) {
          res.children = []
          for (; i < node.childNodes.length; i++)
            res.children.push(simpleNodeSerialize(node.childNodes[i]))
          if (res.children.length == 1) {
            res.child = res.children[0]
            ;delete res.children
          }
        }
        return res
      }

    , insertionTest = function (options) {
        test(options.testName, function (complete) {
          var root = document.getElementById('insertiontastic'), actualTree
            , ctx = {}, i

          root.innerHTML = options.fixtureHTML
          if (options.setup) options.setup.call(ctx, root)
          options.execute.apply(ctx)
          actualTree = simpleNodeSerialize(root)
          actualTree = actualTree.child || actualTree.children
          assert.equal(actualTree, options.expectedTree)
          if (options.verify) {
            if (Object.prototype.toString.call(options.verify) != '[object Array]')
              options.verify = [ options.verify ]
            for (i = 0; i < options.verify.length; i++)
              options.verify[i].call(ctx, root)
          }
          root.innerHTML = ''
          complete()
        })
      }

  /*********************************
   * Single HTML element from $.create()
   */

  var createSingle = function () {
        return $.create('<span class="bam"/>')
      }
    , expectedTreeSingleToSingleAppended = [
         { id: 'insertiontasticFoo' }
       , { clazz: 'bam' }
      ]
    , expectedTreeSingleToSinglePrepended = [
         { clazz: 'bam' }
       , { id: 'insertiontasticFoo' }
      ]
      // verify that the node appended is the *same* element we created, not a clone
    , verifySingleToSingleAppended = function (root) {
        var single = this.single[0] || this.single
        ok(root.childNodes && root.childNodes.length > 0, 'root has children')
        ok(root.childNodes[1] === single, 'element not cloned')
      }
    , verifySingleToSinglePrepended = function (root) {
        var single = this.single[0] || this.single
        ok(root.childNodes && root.childNodes.length > 0, 'root has children')
        ok(root.childNodes[0] === single, 'element not cloned')
      }

  // append()
  insertionTest({
      testName     : 'single element $.create append'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontastic').append(this.single = createSingle())
                     }
    , expectedTree : expectedTreeSingleToSingleAppended
    , verify       : verifySingleToSingleAppended
  })

  // prepend()
  insertionTest({
      testName     : 'single element $.create prepend'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontastic').prepend(this.single = createSingle())
                     }
    , expectedTree : expectedTreeSingleToSinglePrepended
    , verify       : verifySingleToSinglePrepended
  })

  // before()
  insertionTest({
      testName     : 'single element $.create before'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontasticFoo').before(this.single = createSingle())
                     }
    , expectedTree : expectedTreeSingleToSinglePrepended
    , verify       : verifySingleToSinglePrepended
  })

  // after()
  insertionTest({
      testName     : 'single element $.create after'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontasticFoo').after(this.single = createSingle())
                     }
    , expectedTree : expectedTreeSingleToSingleAppended
    , verify       : verifySingleToSingleAppended
  })

  // appendTo()
  insertionTest({
      testName     : 'single element $.create appendTo'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $(this.single = createSingle()).appendTo($('#insertiontastic'))
                     }
    , expectedTree : expectedTreeSingleToSingleAppended
    , verify       : verifySingleToSingleAppended
  })

  // prependTo()
  insertionTest({
      testName     : 'single element $.create prependTo'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $(this.single = createSingle()).prependTo($('#insertiontastic'))
                     }
    , expectedTree : expectedTreeSingleToSinglePrepended
    , verify       : verifySingleToSinglePrepended
  })

  // insertBefore()
  insertionTest({
      testName     : 'single element $.create insertBefore'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $(this.single = createSingle()).insertBefore($('#insertiontasticFoo'))
                     }
    , expectedTree : expectedTreeSingleToSinglePrepended
    , verify       : verifySingleToSinglePrepended
  })

  // insertAfter()
  insertionTest({
      testName     : 'single element $.create insertAfter'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $(this.single = createSingle()).insertAfter($('#insertiontasticFoo'))
                     }
    , expectedTree : expectedTreeSingleToSingleAppended
    , verify       : verifySingleToSingleAppended
  })

  // replaceWith()
  insertionTest({
      testName     : 'single element $.create replaceWith'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p><p id="insertiontasticReplace"></p>'
    , execute      : function () {
                       $('#insertiontasticReplace').replaceWith(this.single = createSingle())
                     }
    , expectedTree : expectedTreeSingleToSingleAppended
    , verify       : verifySingleToSingleAppended
  })

  /*********************************
   * Single HTML element from document.createElement
   */

  var createElementSingle = function () {
        var span = document.createElement('span')
        span.className = 'bam'
        return span
      }

  // append()
  insertionTest({
      testName     : 'single createElement append'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontastic').append(this.single = createElementSingle())
                     }
    , expectedTree : expectedTreeSingleToSingleAppended
    , verify       : verifySingleToSingleAppended
  })

  // prepend()
  insertionTest({
      testName     : 'single createElement prepend'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontastic').prepend(this.single = createElementSingle())
                     }
    , expectedTree : expectedTreeSingleToSinglePrepended
    , verify       : verifySingleToSinglePrepended
  })

  // before()
  insertionTest({
      testName     : 'single createElement before'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontasticFoo').before(this.single = createElementSingle())
                     }
    , expectedTree : expectedTreeSingleToSinglePrepended
    , verify       : verifySingleToSinglePrepended
  })

  // after()
  insertionTest({
      testName     : 'single createElement after'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontasticFoo').after(this.single = createElementSingle())
                     }
    , expectedTree : expectedTreeSingleToSingleAppended
    , verify       : verifySingleToSingleAppended
  })

  // appendTo()
  insertionTest({
      testName     : 'single createElement appendTo'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $(this.single = createElementSingle()).appendTo($('#insertiontastic'))
                     }
    , expectedTree : expectedTreeSingleToSingleAppended
    , verify       : verifySingleToSingleAppended
  })

  // prependTo()
  insertionTest({
      testName     : 'single createElement prependTo'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $(this.single = createElementSingle()).prependTo($('#insertiontastic'))
                     }
    , expectedTree : expectedTreeSingleToSinglePrepended
    , verify       : verifySingleToSinglePrepended
  })

  // insertBefore()
  insertionTest({
      testName     : 'single createElement insertBefore'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $(this.single = createElementSingle()).insertBefore($('#insertiontasticFoo'))
                     }
    , expectedTree : expectedTreeSingleToSinglePrepended
    , verify       : verifySingleToSinglePrepended
  })

  // insertAfter()
  insertionTest({
      testName     : 'single createElement insertAfter'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $(this.single = createElementSingle()).insertAfter($('#insertiontasticFoo'))
                     }
    , expectedTree : expectedTreeSingleToSingleAppended
    , verify       : verifySingleToSingleAppended
  })

  // replaceWith()
  insertionTest({
      testName     : 'single createElement replaceWith'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p><p id="insertiontasticReplace"></p>'
    , execute      : function () {
                       $('#insertiontasticReplace').replaceWith(this.single = createElementSingle())
                     }
    , expectedTree : expectedTreeSingleToSingleAppended
    , verify       : verifySingleToSingleAppended
  })

  /*********************************
   * Single HTML element as a string
   */

  var htmlSingleStr = '<span class="bam"></span>'

  // append()
  insertionTest({
      testName     : 'single element html string append'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontastic').append(htmlSingleStr)
                     }
    , expectedTree : expectedTreeSingleToSingleAppended
  })

  // prepend()
  insertionTest({
      testName     : 'single element html string prepend'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontastic').prepend(htmlSingleStr)
                     }
    , expectedTree : expectedTreeSingleToSinglePrepended
  })

  // before()
  insertionTest({
      testName     : 'single element html string before'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontasticFoo').before(htmlSingleStr)
                     }
    , expectedTree : expectedTreeSingleToSinglePrepended
  })

  // after()
  insertionTest({
      testName     : 'single element html string after'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontasticFoo').after(htmlSingleStr)
                     }
    , expectedTree : expectedTreeSingleToSingleAppended
  })

  // replaceWith()
  insertionTest({
      testName     : 'single element html string replaceWith'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p><p id="insertiontasticReplace"></p>'
    , execute      : function () {
                       $('#insertiontasticReplace').replaceWith(htmlSingleStr)
                     }
    , expectedTree : expectedTreeSingleToSingleAppended
  })

  /*********************************
   * Single element already in the DOM
   */

  var verifyExistingElementSourceEmpty = function () {
        assert.equal(document.getElementById('insertiontasticSource').childNodes.length, 0)
        document.getElementById('insertiontasticSource').innerHTML = ''
      }
    , setupSingleExistingElement = function () {
        document.getElementById('insertiontasticSource').innerHTML = '<span class="bam"></span>'
      }

  // append()
  insertionTest({
      testName     : 'single existing element append'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , setup        : setupSingleExistingElement
    , execute      : function () {
                       $('#insertiontastic').append(this.single = $('#insertiontasticSource > span'))
                     }
    , expectedTree : expectedTreeSingleToSingleAppended
    , verify       : [ verifyExistingElementSourceEmpty, verifySingleToSingleAppended ]
  })

  // prepend()
  insertionTest({
      testName     : 'single existing element prepend'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , setup        : setupSingleExistingElement
    , execute      : function () {
                       $('#insertiontastic').prepend(this.single = $('#insertiontasticSource > span'))
                     }
    , expectedTree : expectedTreeSingleToSinglePrepended
    , verify       : [ verifyExistingElementSourceEmpty, verifySingleToSinglePrepended ]
  })

  // before()
  insertionTest({
      testName     : 'single existing element before'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , setup        : setupSingleExistingElement
    , execute      : function () {
                       $('#insertiontasticFoo').before(this.single = $('#insertiontasticSource > span'))
                     }
    , expectedTree : expectedTreeSingleToSinglePrepended
    , verify       : [ verifyExistingElementSourceEmpty, verifySingleToSinglePrepended ]
  })

  // after()
  insertionTest({
      testName     : 'single existing element after'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , setup        : setupSingleExistingElement
    , execute      : function () {
                       $('#insertiontasticFoo').after(this.single = $('#insertiontasticSource > span'))
                     }
    , expectedTree : expectedTreeSingleToSingleAppended
    , verify       : [ verifyExistingElementSourceEmpty, verifySingleToSingleAppended ]
  })

  // appendTo()
  insertionTest({
      testName     : 'single existing element appendTo'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , setup        : setupSingleExistingElement
    , execute      : function () {
                       $(this.single = $('#insertiontasticSource > span')).appendTo($('#insertiontastic'))
                     }
    , expectedTree : expectedTreeSingleToSingleAppended
    , verify       : [ verifyExistingElementSourceEmpty, verifySingleToSingleAppended ]
  })

  // prependTo()
  insertionTest({
      testName     : 'single existing element prependTo'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , setup        : setupSingleExistingElement
    , execute      : function () {
                       $(this.single = $('#insertiontasticSource > span')).prependTo($('#insertiontastic'))
                     }
    , expectedTree : expectedTreeSingleToSinglePrepended
    , verify       : [ verifyExistingElementSourceEmpty, verifySingleToSinglePrepended ]
  })

  // insertBefore()
  insertionTest({
      testName     : 'single existing element insertBefore'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , setup        : setupSingleExistingElement
    , execute      : function () {
                       $(this.single = $('#insertiontasticSource > span')).insertBefore($('#insertiontasticFoo'))
                     }
    , expectedTree : expectedTreeSingleToSinglePrepended
    , verify       : [ verifyExistingElementSourceEmpty, verifySingleToSinglePrepended ]
  })

  // insertAfter()
  insertionTest({
      testName     : 'single existing element insertAfter'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , setup        : setupSingleExistingElement
    , execute      : function () {
                       $(this.single = $('#insertiontasticSource > span')).insertAfter($('#insertiontasticFoo'))
                     }
    , expectedTree : expectedTreeSingleToSingleAppended
    , verify       : [ verifyExistingElementSourceEmpty, verifySingleToSingleAppended ]
  })

  // replaceWith()
  insertionTest({
      testName     : 'single existing element replaceWith'
    , setup        : setupSingleExistingElement
    , fixtureHTML  : '<p id="insertiontasticFoo"></p><p id="insertiontasticReplace"></p>'
    , execute      : function () {
                       $('#insertiontasticReplace').replaceWith(this.single = $('#insertiontasticSource > span'))
                     }
    , expectedTree : expectedTreeSingleToSingleAppended
    , verify       : [ verifyExistingElementSourceEmpty, verifySingleToSingleAppended ]
  })

  /*********************************
   * Multiple HTML elements from $.create()
   */

  var createMulti = function () {
        return $.create('<span class="bam"></span><p class="bang"><span class="whoa"></span></p><a class="pow"></a>')
      }

  var expectedTreeMultiToSingleAppended = [
         { id: 'insertiontasticFoo' }
       , { clazz: 'bam' }
       , {
             clazz: 'bang'
           , child: { clazz: 'whoa' }
         }
       , { clazz: 'pow' }
      ]
    , expectedTreeMultiToSinglePrepended = [
         { clazz: 'bam' }
       , {
             clazz: 'bang'
           , child: { clazz: 'whoa' }
         }
       , { clazz: 'pow' }
       , { id: 'insertiontasticFoo' }
      ]

  // append()
  insertionTest({
      testName     : 'multiple elements $.create append'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontastic').append(this.single = createMulti())
                     }
    , expectedTree : expectedTreeMultiToSingleAppended
      // we can use SingleToSingle here because just checking that the *first* element isn't a clone should be enough
    , verify       : verifySingleToSingleAppended
  })

  // prepend()
  insertionTest({
      testName     : 'multiple elements $.create prepend'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontastic').prepend(this.single = createMulti())
                     }
    , expectedTree : expectedTreeMultiToSinglePrepended
    , verify       : verifySingleToSinglePrepended
  })

  // before()
  insertionTest({
      testName     : 'multiple elements $.create before'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontasticFoo').before(this.single = createMulti())
                     }
    , expectedTree : expectedTreeMultiToSinglePrepended
    , verify       : verifySingleToSinglePrepended
  })

  // after()
  insertionTest({
      testName     : 'multiple elements $.create after'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontasticFoo').after(this.single = createMulti())
                     }
    , expectedTree : expectedTreeMultiToSingleAppended
    , verify       : verifySingleToSingleAppended
  })

  // appendTo()
  insertionTest({
      testName     : 'multiple elements $.create appendTo'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $(this.single = createMulti()).appendTo($('#insertiontastic'))
                     }
    , expectedTree : expectedTreeMultiToSingleAppended
    , verify       : verifySingleToSingleAppended
  })

  // prependTo()
  insertionTest({
      testName     : 'multiple elements $.create prependTo'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $(this.single = createMulti()).prependTo($('#insertiontastic'))
                     }
    , expectedTree : expectedTreeMultiToSinglePrepended
    , verify       : verifySingleToSinglePrepended
  })

  // insertBefore()
  insertionTest({
      testName     : 'multiple elements $.create insertBefore'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $(this.single = createMulti()).insertBefore($('#insertiontasticFoo'))
                     }
    , expectedTree : expectedTreeMultiToSinglePrepended
    , verify       : verifySingleToSinglePrepended
  })

  // insertAfter()
  insertionTest({
      testName     : 'multiple elements $.create insertAfter'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $(this.single = createMulti()).insertAfter($('#insertiontasticFoo'))
                     }
    , expectedTree : expectedTreeMultiToSingleAppended
    , verify       : verifySingleToSingleAppended
  })

  // replaceWith()
  insertionTest({
      testName     : 'multiple elements $.create replaceWith'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p><p id="insertiontasticReplace"></p>'
    , execute      : function () {
                       $('#insertiontasticReplace').replaceWith(this.single = createMulti())
                     }
    , expectedTree : expectedTreeMultiToSingleAppended
    , verify       : verifySingleToSingleAppended
  })

  /*********************************
   * Multiple HTML elements from document.createElement()
   */

  var createElementMulti = function () {
        var ret = []
        ret.push(document.createElement('span'))
        ret[0].className = 'bam'
        ret.push(document.createElement('p'))
        ret[1].className = 'bang'
        ret[1].appendChild(document.createElement('span'))
        ret[1].childNodes[0].className = 'whoa'
        ret.push(document.createElement('a'))
        ret[2].className = 'pow'
        return ret
      }

  // append()
  insertionTest({
      testName     : 'multiple elements createElement append'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontastic').append(this.single = createElementMulti())
                     }
    , expectedTree : expectedTreeMultiToSingleAppended
      // we can use SingleToSingle here because just checking that the *first* element isn't a clone should be enough
    , verify       : verifySingleToSingleAppended
  })

  // prepend()
  insertionTest({
      testName     : 'multiple elements createElement prepend'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontastic').prepend(this.single = createElementMulti())
                     }
    , expectedTree : expectedTreeMultiToSinglePrepended
    , verify       : verifySingleToSinglePrepended
  })

  // before()
  insertionTest({
      testName     : 'multiple elements createElement before'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontasticFoo').before(this.single = createElementMulti())
                     }
    , expectedTree : expectedTreeMultiToSinglePrepended
    , verify       : verifySingleToSinglePrepended
  })

  // after()
  insertionTest({
      testName     : 'multiple elements createElement after'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontasticFoo').after(this.single = createElementMulti())
                     }
    , expectedTree : expectedTreeMultiToSingleAppended
    , verify       : verifySingleToSingleAppended
  })

  // appendTo()
  insertionTest({
      testName     : 'multiple elements createElement appendTo'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $(this.single = createElementMulti()).appendTo($('#insertiontastic'))
                     }
    , expectedTree : expectedTreeMultiToSingleAppended
    , verify       : verifySingleToSingleAppended
  })

  // prependTo()
  insertionTest({
      testName     : 'multiple elements createElement prependTo'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $(this.single = createElementMulti()).prependTo($('#insertiontastic'))
                     }
    , expectedTree : expectedTreeMultiToSinglePrepended
    , verify       : verifySingleToSinglePrepended
  })

  // insertBefore()
  insertionTest({
      testName     : 'multiple elements createElement insertBefore'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $(this.single = createElementMulti()).insertBefore($('#insertiontasticFoo'))
                     }
    , expectedTree : expectedTreeMultiToSinglePrepended
    , verify       : verifySingleToSinglePrepended
  })

  // insertAfter()
  insertionTest({
      testName     : 'multiple elements createElement insertAfter'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $(this.single = createElementMulti()).insertAfter($('#insertiontasticFoo'))
                     }
    , expectedTree : expectedTreeMultiToSingleAppended
    , verify       : verifySingleToSingleAppended
  })

  // replaceWith()
  insertionTest({
      testName     : 'multiple elements createElement replaceWith'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p><p id="insertiontasticReplace"></p>'
    , execute      : function () {
                       $('#insertiontasticReplace').replaceWith(this.single = createElementMulti())
                     }
    , expectedTree : expectedTreeMultiToSingleAppended
    , verify       : verifySingleToSingleAppended
  })

  /*********************************
   * Multiple HTML elements from string
   */

  var htmlMultiStr = '<span class="bam"></span><p class="bang"><span class="whoa"></span></p><a class="pow"></a>'

  // append()
  insertionTest({
      testName     : 'multiple elements html string append'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontastic').append(htmlMultiStr)
                     }
    , expectedTree : expectedTreeMultiToSingleAppended
  })

  // prepend()
  insertionTest({
      testName     : 'multiple elements html string prepend'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontastic').prepend(htmlMultiStr)
                     }
    , expectedTree : expectedTreeMultiToSinglePrepended
  })

  // before()
  insertionTest({
      testName     : 'multiple elements html string before'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontasticFoo').before(htmlMultiStr)
                     }
    , expectedTree : expectedTreeMultiToSinglePrepended
  })

  // after()
  insertionTest({
      testName     : 'multiple elements html string after'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontasticFoo').after(htmlMultiStr)
                     }
    , expectedTree : expectedTreeMultiToSingleAppended
  })

  // replaceWith()
  insertionTest({
      testName     : 'multiple elements html string replaceWith'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p><p id="insertiontasticReplace"></p>'
    , execute      : function () {
                       $('#insertiontasticReplace').replaceWith(htmlMultiStr)
                     }
    , expectedTree : expectedTreeMultiToSingleAppended
  })

  /*********************************
   * Multiple elements already in the DOM
   */

  var setupMultiExistingElements = function () {
        document.getElementById('insertiontasticSource').innerHTML = htmlMultiStr
      }

  // append()
  insertionTest({
      testName     : 'multiple existing elements append'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , setup        : setupMultiExistingElements
    , execute      : function () {
                       $('#insertiontastic').append(this.single = $('#insertiontasticSource > *'))
                     }
    , expectedTree : expectedTreeMultiToSingleAppended
      // we can use SingleToSingle here because just checking that the *first* element isn't a clone should be enough
    , verify       : [ verifyExistingElementSourceEmpty, verifySingleToSingleAppended ]
  })

  // prepend()
  insertionTest({
      testName     : 'multiple existing elements prepend'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , setup        : setupMultiExistingElements
    , execute      : function () {
                       $('#insertiontastic').prepend(this.single = $('#insertiontasticSource > *'))
                     }
    , expectedTree : expectedTreeMultiToSinglePrepended
    , verify       : [ verifyExistingElementSourceEmpty, verifySingleToSinglePrepended ]
  })

  // before()
  insertionTest({
      testName     : 'multiple existing elements before'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , setup        : setupMultiExistingElements
    , execute      : function () {
                       $('#insertiontasticFoo').before(this.single = $('#insertiontasticSource > *'))
                     }
    , expectedTree : expectedTreeMultiToSinglePrepended
    , verify       : [ verifyExistingElementSourceEmpty, verifySingleToSinglePrepended ]
  })

  // after()
  insertionTest({
      testName     : 'multiple existing elements after'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , setup        : setupMultiExistingElements
    , execute      : function () {
                       $('#insertiontasticFoo').after(this.single = $('#insertiontasticSource > *'))
                     }
    , expectedTree : expectedTreeMultiToSingleAppended
    , verify       : [ verifyExistingElementSourceEmpty, verifySingleToSingleAppended ]
  })

  // appendTo()
  insertionTest({
      testName     : 'multiple existing elements appendTo'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , setup        : setupMultiExistingElements
    , execute      : function () {
                       $(this.single = $('#insertiontasticSource > *')).appendTo($('#insertiontastic'))
                     }
    , expectedTree : expectedTreeMultiToSingleAppended
    , verify       : [ verifyExistingElementSourceEmpty, verifySingleToSingleAppended ]
  })

  // prependTo()
  insertionTest({
      testName     : 'multiple existing elements prependTo'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , setup        : setupMultiExistingElements
    , execute      : function () {
                       $(this.single = $('#insertiontasticSource > *')).prependTo($('#insertiontastic'))
                     }
    , expectedTree : expectedTreeMultiToSinglePrepended
    , verify       : [ verifyExistingElementSourceEmpty, verifySingleToSinglePrepended ]
  })

  // insertBefore()
  insertionTest({
      testName     : 'multiple existing elements insertBefore'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , setup        : setupMultiExistingElements
    , execute      : function () {
                       $(this.single = $('#insertiontasticSource > *')).insertBefore($('#insertiontasticFoo'))
                     }
    , expectedTree : expectedTreeMultiToSinglePrepended
    , verify       : [ verifyExistingElementSourceEmpty, verifySingleToSinglePrepended ]
  })

  // insertAfter()
  insertionTest({
      testName     : 'multiple existing elements insertAfter'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , setup        : setupMultiExistingElements
    , execute      : function () {
                       $(this.single = $('#insertiontasticSource > *')).insertAfter($('#insertiontasticFoo'))
                     }
    , expectedTree : expectedTreeMultiToSingleAppended
    , verify       : [ verifyExistingElementSourceEmpty, verifySingleToSingleAppended ]
  })

  // replaceWith()
  insertionTest({
      testName     : 'multiple existing elements replaceWith'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p><p id="insertiontasticReplace"></p>'
    , setup        : setupMultiExistingElements
    , execute      : function () {
                       $('#insertiontasticReplace').replaceWith(this.single = $('#insertiontasticSource > *'))
                     }
    , expectedTree : expectedTreeMultiToSingleAppended
    , verify       : [ verifyExistingElementSourceEmpty, verifySingleToSingleAppended ]
  })

  /*********************************
   * Single HTML element from $.create() to multiple targets
   */

  var multiTargetFixtureHTML            = '<p class="insFoo1"><span class="inner1"></span></p><p class="insFoo2"><span class="inner2"></span></p><p class="insFoo3"><span class="inner3"></span></p>'
    , multiTargetReplaceWithFixtureHTML = '<p class="insFoo1"><span class="inner1"></span><a class="replacable"></a></p><p class="insFoo2"><span class="inner2"></span><a class="replacable"></a></p><p class="insFoo3"><span class="inner3"></span><a class="replacable"></a></p>'
    , expectedTreeSingleToMultiAppended = [
         {
             clazz: 'insFoo1'
           , children: [
                 { clazz: 'inner1' }
               , { clazz: 'bam' }
             ]
         }
       , {
             clazz: 'insFoo2'
           , children: [
                 { clazz: 'inner2' }
               , { clazz: 'bam' }
             ]
         }
       , {
             clazz: 'insFoo3'
           , children: [
                 { clazz: 'inner3' }
               , { clazz: 'bam' }
             ]
         }
      ]
    , expectedTreeSingleToMultiPrepended = [
        {
           clazz: 'insFoo1'
         , children: [
               { clazz: 'bam' }
             , { clazz: 'inner1' }
           ]
        }
        , {
           clazz: 'insFoo2'
         , children: [
               { clazz: 'bam' }
             , { clazz: 'inner2' }
           ]
        }
        , {
           clazz: 'insFoo3'
         , children: [
               { clazz: 'bam' }
             , { clazz: 'inner3' }
           ]
        }
      ]
    , verifySingleToMultiAppended = function (root) {
        var single = this.single[0] || this.single
        ok(root.childNodes[0].childNodes[1] === single, 'element not cloned')
      }
    , verifySingleToMultiPrepended = function (root) {
        var single = this.single[0] || this.single
        ok(root.childNodes[0].childNodes[0] === single, 'element not cloned')
      }

  // append()
  insertionTest({
      testName     : 'single element $.create append to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p').append(this.single = createSingle())
                     }
    , expectedTree : expectedTreeSingleToMultiAppended
    , verify       : verifySingleToMultiAppended
  })

  // prepend()
  insertionTest({
      testName     : 'single element $.create prepend to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p').prepend(this.single = createSingle())
                     }
    , expectedTree : expectedTreeSingleToMultiPrepended
    , verify       : verifySingleToMultiPrepended
  })

  // before()
  insertionTest({
      testName     : 'single element $.create before to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p > span').before(this.single = createSingle())
                     }
    , expectedTree : expectedTreeSingleToMultiPrepended
    , verify       : verifySingleToMultiPrepended
  })

  // after()
  insertionTest({
      testName     : 'single element $.create after to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p > span').after(this.single = createSingle())
                     }
    , expectedTree : expectedTreeSingleToMultiAppended
    , verify       : verifySingleToMultiAppended
  })

  // appendTo()
  insertionTest({
      testName     : 'single element $.create appendTo to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $(this.single = createSingle()).appendTo($('#insertiontastic > p'))
                     }
    , expectedTree : expectedTreeSingleToMultiAppended
  })

  // prependTo()
  insertionTest({
      testName     : 'single element $.create prependTo to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $(this.single = createSingle()).prependTo($('#insertiontastic > p'))
                     }
    , expectedTree : expectedTreeSingleToMultiPrepended
    , verify       : verifySingleToMultiPrepended
  })

  // insertBefore()
  insertionTest({
      testName     : 'single element $.create insertBefore to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $(this.single = createSingle()).insertBefore($('#insertiontastic > p > span'))
                     }
    , expectedTree : expectedTreeSingleToMultiPrepended
    , verify       : verifySingleToMultiPrepended
  })

  // insertAfter()
  insertionTest({
      testName     : 'single element $.create insertAfter to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $(this.single = createSingle()).insertAfter($('#insertiontastic > p > span'))
                     }
    , expectedTree : expectedTreeSingleToMultiAppended
    , verify       : verifySingleToMultiAppended
  })

  // replaceWith()
  insertionTest({
      testName     : 'single element $.create replaceWith to multiple targets'
    , fixtureHTML  : multiTargetReplaceWithFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p > a').replaceWith(this.single = createSingle())
                     }
    , expectedTree : expectedTreeSingleToMultiAppended
    , verify       : verifySingleToMultiAppended
  })

  /*********************************
   * Single element from document.createElement() to multiple targets
   */

  // append()
  insertionTest({
      testName     : 'single element createElement() append to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p').append(this.single = createElementSingle())
                     }
    , expectedTree : expectedTreeSingleToMultiAppended
    , verify       : verifySingleToMultiAppended
  })

  // prepend()
  insertionTest({
      testName     : 'single element createElement() prepend to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p').prepend(this.single = createElementSingle())
                     }
    , expectedTree : expectedTreeSingleToMultiPrepended
    , verify       : verifySingleToMultiPrepended
  })

  // before()
  insertionTest({
      testName     : 'single element createElement() before to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p > span').before(this.single = createElementSingle())
                     }
    , expectedTree : expectedTreeSingleToMultiPrepended
    , verify       : verifySingleToMultiPrepended
  })

  // after()
  insertionTest({
      testName     : 'single element createElement() after to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p > span').after(this.single = createElementSingle())
                     }
    , expectedTree : expectedTreeSingleToMultiAppended
    , verify       : verifySingleToMultiAppended
  })

  // appendTo()
  insertionTest({
      testName     : 'single element createElement() appendTo to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $(this.single = createElementSingle()).appendTo($('#insertiontastic > p'))
                     }
    , expectedTree : expectedTreeSingleToMultiAppended
    , verify       : verifySingleToMultiAppended
  })

  // prependTo()
  insertionTest({
      testName     : 'single element createElement() prependTo to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $(this.single = createElementSingle()).prependTo($('#insertiontastic > p'))
                     }
    , expectedTree : expectedTreeSingleToMultiPrepended
    , verify       : verifySingleToMultiPrepended
  })

  // insertBefore()
  insertionTest({
      testName     : 'single element createElement() insertBefore to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $(this.single = createElementSingle()).insertBefore($('#insertiontastic > p > span'))
                     }
    , expectedTree : expectedTreeSingleToMultiPrepended
    , verify       : verifySingleToMultiPrepended
  })

  // insertAfter()
  insertionTest({
      testName     : 'single element createElement() insertAfter to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $(this.single = createElementSingle()).insertAfter($('#insertiontastic > p > span'))
                     }
    , expectedTree : expectedTreeSingleToMultiAppended
    , verify       : verifySingleToMultiAppended
  })

  // replaceWith()
  insertionTest({
      testName     : 'single element createElement() replaceWith to multiple targets'
    , fixtureHTML  : multiTargetReplaceWithFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p > a').replaceWith(this.single = createElementSingle())
                     }
    , expectedTree : expectedTreeSingleToMultiAppended
    , verify       : verifySingleToMultiAppended
  })

  /*********************************
   * Single HTML element from string to multiple targets
   */

  // append()
  insertionTest({
      testName     : 'single element html string append to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p').append(htmlSingleStr)
                     }
    , expectedTree : expectedTreeSingleToMultiAppended
  })

  // prepend()
  insertionTest({
      testName     : 'single element html string prepend to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p').prepend(htmlSingleStr)
                     }
    , expectedTree : expectedTreeSingleToMultiPrepended
  })

  // before()
  insertionTest({
      testName     : 'single element html string before to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p > span').before(htmlSingleStr)
                     }
    , expectedTree : expectedTreeSingleToMultiPrepended
  })

  // after()
  insertionTest({
      testName     : 'single element html string after to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p > span').after(htmlSingleStr)
                     }
    , expectedTree : expectedTreeSingleToMultiAppended
  })

  // replaceWith()
  insertionTest({
      testName     : 'single element html string replaceWith to multiple targets'
    , fixtureHTML  : multiTargetReplaceWithFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p > a').replaceWith(htmlSingleStr)
                     }
    , expectedTree : expectedTreeSingleToMultiAppended
  })

  /*********************************
   * Single element already in the DOM to multiple targets
   */

  // append()
  insertionTest({
      testName     : 'single existing element append to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , setup        : setupSingleExistingElement
    , execute      : function () {
                       $('#insertiontastic > p').append(this.single = $('#insertiontasticSource > span'))
                     }
    , expectedTree : expectedTreeSingleToMultiAppended
      // we can use SingleToSingle here because just checking that the *first* element isn't a clone should be enough
    , verify       : [ verifyExistingElementSourceEmpty, verifySingleToMultiAppended ]
  })

  // prepend()
  insertionTest({
      testName     : 'single existing element prepend to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , setup        : setupSingleExistingElement
    , execute      : function () {
                       $('#insertiontastic > p').prepend(this.single = $('#insertiontasticSource > span'))
                     }
    , expectedTree : expectedTreeSingleToMultiPrepended
    , verify       : [ verifyExistingElementSourceEmpty, verifySingleToMultiPrepended ]
  })

  // before()
  insertionTest({
      testName     : 'single existing element before to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , setup        : setupSingleExistingElement
    , execute      : function () {
                       $('#insertiontastic > p > span').before(this.single = $('#insertiontasticSource > span'))
                     }
    , expectedTree : expectedTreeSingleToMultiPrepended
    , verify       : [ verifyExistingElementSourceEmpty, verifySingleToMultiPrepended ]
  })

  // after()
  insertionTest({
      testName     : 'single existing element after to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , setup        : setupSingleExistingElement
    , execute      : function () {
                       $('#insertiontastic > p > span').after(this.single = $('#insertiontasticSource > span'))
                     }
    , expectedTree : expectedTreeSingleToMultiAppended
    , verify       : [ verifyExistingElementSourceEmpty, verifySingleToMultiAppended ]
  })

  // appendTo()
  insertionTest({
      testName     : 'single existing element appendTo to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , setup        : setupSingleExistingElement
    , execute      : function () {
                       $(this.single = $('#insertiontasticSource > span')).appendTo($('#insertiontastic > p'))
                     }
    , expectedTree : expectedTreeSingleToMultiAppended
    , verify       : [ verifyExistingElementSourceEmpty, verifySingleToMultiAppended ]
  })

  // prependTo()
  insertionTest({
      testName     : 'single existing element prependTo to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , setup        : setupSingleExistingElement
    , execute      : function () {
                       $(this.single = $('#insertiontasticSource > span')).prependTo($('#insertiontastic > p'))
                     }
    , expectedTree : expectedTreeSingleToMultiPrepended
    , verify       : [ verifyExistingElementSourceEmpty, verifySingleToMultiPrepended ]
  })

  // insertBefore()
  insertionTest({
      testName     : 'single existing element insertBefore to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , setup        : setupSingleExistingElement
    , execute      : function () {
                       $(this.single = $('#insertiontasticSource > span')).insertBefore($('#insertiontastic > p > span'))
                     }
    , expectedTree : expectedTreeSingleToMultiPrepended
    , verify       : [ verifyExistingElementSourceEmpty, verifySingleToMultiPrepended ]
  })

  // insertAfter()
  insertionTest({
      testName     : 'single existing element insertAfter to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , setup        : setupSingleExistingElement
    , execute      : function () {
                       $(this.single = $('#insertiontasticSource > span')).insertAfter($('#insertiontastic > p > span'))
                     }
    , expectedTree : expectedTreeSingleToMultiAppended
    , verify       : [ verifyExistingElementSourceEmpty, verifySingleToMultiAppended ]
  })

  // replaceWith()
  insertionTest({
      testName     : 'single existing element replaceWith to multiple targets'
    , fixtureHTML  : multiTargetReplaceWithFixtureHTML
    , setup        : setupSingleExistingElement
    , execute      : function () {
                       $('#insertiontastic > p > a').replaceWith(this.single = $('#insertiontasticSource > span'))
                     }
    , expectedTree : expectedTreeSingleToMultiAppended
    , verify       : [ verifyExistingElementSourceEmpty, verifySingleToMultiAppended ]
  })

  /*********************************
   * Multiple HTML elements from $.create() to multiple targets
   */

  var expectedTreeMultiToMultiAppended = [
         {
             clazz: 'insFoo1'
           , children: [
                 { clazz: 'inner1' }
               , { clazz: 'bam' }
               , {
                     clazz: 'bang'
                   , child: { clazz: 'whoa' }
                 }
               , { clazz: 'pow' }
             ]
         }
       , {
             clazz: 'insFoo2'
           , children: [
                 { clazz: 'inner2' }
               , { clazz: 'bam' }
               , {
                     clazz: 'bang'
                   , child: { clazz: 'whoa' }
                 }
               , { clazz: 'pow' }
             ]
         }
       , {
             clazz: 'insFoo3'
           , children: [
                 { clazz: 'inner3' }
               , { clazz: 'bam' }
               , {
                     clazz: 'bang'
                   , child: { clazz: 'whoa' }
                 }
               , { clazz: 'pow' }
             ]
         }
      ]
    , expectedTreeMultiToMultiPrepended = [
           {
               clazz: 'insFoo1'
             , children: [
                   { clazz: 'bam' }
                 , {
                       clazz: 'bang'
                     , child: { clazz: 'whoa' }
                   }
                 , { clazz: 'pow' }
                 , { clazz: 'inner1' }
               ]
           }
         , {
               clazz: 'insFoo2'
             , children: [
                   { clazz: 'bam' }
                 , {
                       clazz: 'bang'
                     , child: { clazz: 'whoa' }
                   }
                 , { clazz: 'pow' }
                 , { clazz: 'inner2' }
               ]
           }
         , {
               clazz: 'insFoo3'
             , children: [
                   { clazz: 'bam' }
                 , {
                       clazz: 'bang'
                     , child: { clazz: 'whoa' }
                   }
                 , { clazz: 'pow' }
                 , { clazz: 'inner3' }
               ]
           }
       ]

  // append()
  insertionTest({
      testName     : 'multiple elements $.create append to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p').append(this.single = createMulti())
                     }
    , expectedTree : expectedTreeMultiToMultiAppended
      // we can use SingleToMulti here because just checking that the *first* element isn't a clone should be enough
    , verify       : verifySingleToMultiAppended
  })

  // prepend()
  insertionTest({
      testName     : 'multiple elements $.create prepend to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p').prepend(this.single = createMulti())
                     }
    , expectedTree : expectedTreeMultiToMultiPrepended
    , verify       : verifySingleToMultiPrepended
  })

  // before()
  insertionTest({
      testName     : 'multiple elements $.create before to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p > span').before(this.single = createMulti())
                     }
    , expectedTree : expectedTreeMultiToMultiPrepended
    , verify       : verifySingleToMultiPrepended
  })

  // after()
  insertionTest({
      testName     : 'multiple elements $.create after to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p > span').after(this.single = createMulti())
                     }
    , expectedTree : expectedTreeMultiToMultiAppended
    , verify       : verifySingleToMultiAppended
  })

  // appendTo()
  insertionTest({
      testName     : 'multiple elements $.create appendTo to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $(this.single = createMulti()).appendTo($('#insertiontastic > p'))
                     }
    , expectedTree : expectedTreeMultiToMultiAppended
    , verify       : verifySingleToMultiAppended
  })

  // prependTo()
  insertionTest({
      testName     : 'multiple elements $.create prependTo to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $(this.single = createMulti()).prependTo($('#insertiontastic > p'))
                     }
    , expectedTree : expectedTreeMultiToMultiPrepended
    , verify       : verifySingleToMultiPrepended
  })

  // insertBefore()
  insertionTest({
      testName     : 'multiple elements $.create insertBefore to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $(this.single = createMulti()).insertBefore($('#insertiontastic > p > span'))
                     }
    , expectedTree : expectedTreeMultiToMultiPrepended
    , verify       : verifySingleToMultiPrepended
  })

  // insertAfter()
  insertionTest({
      testName     : 'multiple element $.create insertAfter to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $(this.single = createMulti()).insertAfter($('#insertiontastic > p > span'))
                     }
    , expectedTree : expectedTreeMultiToMultiAppended
    , verify       : verifySingleToMultiAppended
  })

  // replaceWith()
  insertionTest({
      testName     : 'multiple element $.create replaceWith to multiple targets'
    , fixtureHTML  : multiTargetReplaceWithFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p > a').replaceWith(this.single = createMulti())
                     }
    , expectedTree : expectedTreeMultiToMultiAppended
    , verify       : [ verifyExistingElementSourceEmpty, verifySingleToMultiAppended ]
  })

  /*********************************
   * Multiple HTML elements from document.createElement() to multiple targets
   */

  // append()
  insertionTest({
      testName     : 'multiple elements createElement() append to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p').append(this.single = createElementMulti())
                     }
    , expectedTree : expectedTreeMultiToMultiAppended
    , verify       : verifySingleToMultiAppended
  })

  // prepend()
  insertionTest({
      testName     : 'multiple elements createElement() prepend to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p').prepend(this.single = createElementMulti())
                     }
    , expectedTree : expectedTreeMultiToMultiPrepended
    , verify       : verifySingleToMultiPrepended
  })

  // before()
  insertionTest({
      testName     : 'multiple elements createElement() before to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p > span').before(this.single = createElementMulti())
                     }
    , expectedTree : expectedTreeMultiToMultiPrepended
    , verify       : verifySingleToMultiPrepended
  })

  // after()
  insertionTest({
      testName     : 'multiple elements createElement() after to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p > span').after(this.single = createElementMulti())
                     }
    , expectedTree : expectedTreeMultiToMultiAppended
    , verify       : verifySingleToMultiAppended
  })

  // appendTo()
  insertionTest({
      testName     : 'multiple elements createElement() appendTo to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $(this.single = createElementMulti()).appendTo($('#insertiontastic > p'))
                     }
    , expectedTree : expectedTreeMultiToMultiAppended
    , verify       : verifySingleToMultiAppended
  })

  // prependTo()
  insertionTest({
      testName     : 'multiple elements createElement() prependTo to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $(this.single = createElementMulti()).prependTo($('#insertiontastic > p'))
                     }
    , expectedTree : expectedTreeMultiToMultiPrepended
    , verify       : verifySingleToMultiPrepended
  })

  // insertBefore()
  insertionTest({
      testName     : 'multiple elements createElement() insertBefore to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $(this.single = createElementMulti()).insertBefore($('#insertiontastic > p > span'))
                     }
    , expectedTree : expectedTreeMultiToMultiPrepended
    , verify       : verifySingleToMultiPrepended
  })

  // insertAfter()
  insertionTest({
      testName     : 'multiple element createElement() insertAfter to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $(this.single = createElementMulti()).insertAfter($('#insertiontastic > p > span'))
                     }
    , expectedTree : expectedTreeMultiToMultiAppended
    , verify       : verifySingleToMultiAppended
  })

  // replaceWith()
  insertionTest({
      testName     : 'multiple element createElement() replaceWith to multiple targets'
    , fixtureHTML  : multiTargetReplaceWithFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p > a').replaceWith(this.single = createElementMulti())
                     }
    , expectedTree : expectedTreeMultiToMultiAppended
    , verify       : [ verifyExistingElementSourceEmpty, verifySingleToMultiAppended ]
  })

  /*********************************
   * Multiple HTML elements from html string to multiple targets
   */

  // append()
  insertionTest({
      testName     : 'multiple elements html string append to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p').append(htmlMultiStr)
                     }
    , expectedTree : expectedTreeMultiToMultiAppended
  })

  // prepend()
  insertionTest({
      testName     : 'multiple elements html string prepend to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p').prepend(htmlMultiStr)
                     }
    , expectedTree : expectedTreeMultiToMultiPrepended
  })

  // before()
  insertionTest({
      testName     : 'multiple elements html string before to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p > span').before(htmlMultiStr)
                     }
    , expectedTree : expectedTreeMultiToMultiPrepended
  })

  // after()
  insertionTest({
      testName     : 'multiple elements html string after to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p > span').after(htmlMultiStr)
                     }
    , expectedTree : expectedTreeMultiToMultiAppended
  })

  // replaceWith()
  insertionTest({
      testName     : 'multiple elements html string replaceWith to multiple targets'
    , fixtureHTML  : multiTargetReplaceWithFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p > a').replaceWith(htmlMultiStr)
                     }
    , expectedTree : expectedTreeMultiToMultiAppended
  })

  /*********************************
   * Multiple elements already in the DOM to multiple targets
   */

  // append()
  insertionTest({
      testName     : 'multiple existing elementss append to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , setup        : setupMultiExistingElements
    , execute      : function () {
                       $('#insertiontastic > p').append(this.single = $('#insertiontasticSource > *'))
                     }
    , expectedTree : expectedTreeMultiToMultiAppended
      // we can use SingleToSingle here because just checking that the *first* element isn't a clone should be enough
    , verify       : [ verifyExistingElementSourceEmpty, verifySingleToMultiAppended ]
  })

  // prepend()
  insertionTest({
      testName     : 'multiple existing elements prepend to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , setup        : setupMultiExistingElements
    , execute      : function () {
                       $('#insertiontastic > p').prepend(this.single = $('#insertiontasticSource > *'))
                     }
    , expectedTree : expectedTreeMultiToMultiPrepended
    , verify       : [ verifyExistingElementSourceEmpty, verifySingleToMultiPrepended ]
  })

  // before()
  insertionTest({
      testName     : 'multiple existing elements before to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , setup        : setupMultiExistingElements
    , execute      : function () {
                       $('#insertiontastic > p > span').before(this.single = $('#insertiontasticSource > *'))
                     }
    , expectedTree : expectedTreeMultiToMultiPrepended
    , verify       : [ verifyExistingElementSourceEmpty, verifySingleToMultiPrepended ]
  })

  // after()
  insertionTest({
      testName     : 'multiple existing elements after to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , setup        : setupMultiExistingElements
    , execute      : function () {
                       $('#insertiontastic > p > span').after(this.single = $('#insertiontasticSource > *'))
                     }
    , expectedTree : expectedTreeMultiToMultiAppended
    , verify       : [ verifyExistingElementSourceEmpty, verifySingleToMultiAppended ]
  })

  // appendTo()
  insertionTest({
      testName     : 'multiple existing elements appendTo to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , setup        : setupMultiExistingElements
    , execute      : function () {
                       $(this.single = $('#insertiontasticSource > *')).appendTo($('#insertiontastic > p'))
                     }
    , expectedTree : expectedTreeMultiToMultiAppended
    , verify       : [ verifyExistingElementSourceEmpty, verifySingleToMultiAppended ]
  })

  // prependTo()
  insertionTest({
      testName     : 'multiple existing elements prependTo to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , setup        : setupMultiExistingElements
    , execute      : function () {
                       $(this.single = $('#insertiontasticSource > *')).prependTo($('#insertiontastic > p'))
                     }
    , expectedTree : expectedTreeMultiToMultiPrepended
    , verify       : [ verifyExistingElementSourceEmpty, verifySingleToMultiPrepended ]
  })

  // insertBefore()
  insertionTest({
      testName     : 'multiple existing elements insertBefore to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , setup        : setupMultiExistingElements
    , execute      : function () {
                       $(this.single = $('#insertiontasticSource > *')).insertBefore($('#insertiontastic > p > span'))
                     }
    , expectedTree : expectedTreeMultiToMultiPrepended
    , verify       : [ verifyExistingElementSourceEmpty, verifySingleToMultiPrepended ]
  })

  // insertAfter()
  insertionTest({
      testName     : 'multiple existing elements insertAfter to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , setup        : setupMultiExistingElements
    , execute      : function () {
                       $(this.single = $('#insertiontasticSource > *')).insertAfter($('#insertiontastic > p > span'))
                     }
    , expectedTree : expectedTreeMultiToMultiAppended
    , verify       : [ verifyExistingElementSourceEmpty, verifySingleToMultiAppended ]
  })

  // replaceWith()
  insertionTest({
      testName     : 'multiple existing elements replaceWith to multiple targets'
    , fixtureHTML  : multiTargetReplaceWithFixtureHTML
    , setup        : setupMultiExistingElements
    , execute      : function () {
                       $('#insertiontastic > p > a').replaceWith(this.single = $('#insertiontasticSource > *'))
                     }
    , expectedTree : expectedTreeMultiToMultiAppended
    , verify       : [ verifyExistingElementSourceEmpty, verifySingleToMultiAppended ]
  })

})