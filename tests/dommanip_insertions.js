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
  function simpleNodeSerialize (node) {
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

  function insertionTest (options) {
    test(options.testName, function (complete) {
      var root = document.getElementById('insertiontastic'), actualTree
      root.innerHTML = options.fixtureHTML
      options.execute()
      actualTree = simpleNodeSerialize(root)
      actualTree = actualTree.child || actualTree.children
      assert.equal(actualTree, options.expectedTree)
      root.innerHTML = ''
      complete()
    })
  }

  /*********************************
   * Single HTML element from $.create()
   */

  function createSingle () {
    return $.create('<span class="bam"/>')
  }

  var expectedTreeSingleToSingleAppended = [
         { id: 'insertiontasticFoo' }
       , { clazz: 'bam' }
      ]
    , expectedTreeSingleToSinglePrepended = [
         { clazz: 'bam' }
       , { id: 'insertiontasticFoo' }
      ]

  // append()
  insertionTest({
      testName     : 'single element $.create append'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontastic').append(createSingle())
                     }
    , expectedTree : expectedTreeSingleToSingleAppended
  })

  // prepend()
  insertionTest({
      testName     : 'single element $.create prepend'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontastic').prepend(createSingle())
                     }
    , expectedTree : expectedTreeSingleToSinglePrepended
  })

  // before()
  insertionTest({
      testName     : 'single element $.create before'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontasticFoo').before(createSingle())
                     }
    , expectedTree : expectedTreeSingleToSinglePrepended
  })

  // after()
  insertionTest({
      testName     : 'single element $.create after'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontasticFoo').after(createSingle())
                     }
    , expectedTree : expectedTreeSingleToSingleAppended
  })

  // appendTo()
  insertionTest({
      testName     : 'single element $.create appendTo'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $(createSingle()).appendTo($('#insertiontastic'))
                     }
    , expectedTree : expectedTreeSingleToSingleAppended
  })

  // prependTo()
  insertionTest({
      testName     : 'single element $.create prependTo'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $(createSingle()).prependTo($('#insertiontastic'))
                     }
    , expectedTree : expectedTreeSingleToSinglePrepended
  })

  // insertBefore()
  insertionTest({
      testName     : 'single element $.create insertBefore'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $(createSingle()).insertBefore($('#insertiontasticFoo'))
                     }
    , expectedTree : expectedTreeSingleToSinglePrepended
  })

  // insertAfter()
  insertionTest({
      testName     : 'single element $.create insertAfter'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $(createSingle()).insertAfter($('#insertiontasticFoo'))
                     }
    , expectedTree : expectedTreeSingleToSingleAppended
  })

  /*********************************
   * Single HTML element from document.createElement
   */

  function createElementSingle () {
    var span = document.createElement('span')
    span.className = 'bam'
    return span
  }

  // append()
  insertionTest({
      testName     : 'single createElement append'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontastic').append(createElementSingle())
                     }
    , expectedTree : expectedTreeSingleToSingleAppended
  })

  // prepend()
  insertionTest({
      testName     : 'single createElement prepend'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontastic').prepend(createElementSingle())
                     }
    , expectedTree : expectedTreeSingleToSinglePrepended
  })

  // before()
  insertionTest({
      testName     : 'single createElement before'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontasticFoo').before(createElementSingle())
                     }
    , expectedTree : expectedTreeSingleToSinglePrepended
  })

  // after()
  insertionTest({
      testName     : 'single createElement after'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontasticFoo').after(createElementSingle())
                     }
    , expectedTree : expectedTreeSingleToSingleAppended
  })

  // appendTo()
  insertionTest({
      testName     : 'single createElement appendTo'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $(createElementSingle()).appendTo($('#insertiontastic'))
                     }
    , expectedTree : expectedTreeSingleToSingleAppended
  })

  // prependTo()
  insertionTest({
      testName     : 'single createElement prependTo'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $(createElementSingle()).prependTo($('#insertiontastic'))
                     }
    , expectedTree : expectedTreeSingleToSinglePrepended
  })

  // insertBefore()
  insertionTest({
      testName     : 'single createElement insertBefore'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $(createElementSingle()).insertBefore($('#insertiontasticFoo'))
                     }
    , expectedTree : expectedTreeSingleToSinglePrepended
  })

  // insertAfter()
  insertionTest({
      testName     : 'single createElement insertAfter'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $(createElementSingle()).insertAfter($('#insertiontasticFoo'))
                     }
    , expectedTree : expectedTreeSingleToSingleAppended
  })

  /*********************************
   * Single HTML element as a string
   */

  var htmlSingleStr = '<span class="bam"></span>'

  // append()
  insertionTest({
      testName     : 'single html string append'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontastic').append(htmlSingleStr)
                     }
    , expectedTree : expectedTreeSingleToSingleAppended
  })

  // prepend()
  insertionTest({
      testName     : 'single html string prepend'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontastic').prepend(htmlSingleStr)
                     }
    , expectedTree : expectedTreeSingleToSinglePrepended
  })

  // before()
  insertionTest({
      testName     : 'single html string before'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontasticFoo').before(htmlSingleStr)
                     }
    , expectedTree : expectedTreeSingleToSinglePrepended
  })

  // after()
  insertionTest({
      testName     : 'single html string after'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontasticFoo').after(htmlSingleStr)
                     }
    , expectedTree : expectedTreeSingleToSingleAppended
  })

  /*********************************
   * Multiple HTML elements from $.create()
   */

  function createMulti () {
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
                       $('#insertiontastic').append(createMulti())
                     }
    , expectedTree : expectedTreeMultiToSingleAppended
  })

  // prepend()
  insertionTest({
      testName     : 'multiple elements $.create prepend'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontastic').prepend(createMulti())
                     }
    , expectedTree : expectedTreeMultiToSinglePrepended
  })

  // before()
  insertionTest({
      testName     : 'multiple elements $.create before'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontasticFoo').before(createMulti())
                     }
    , expectedTree : expectedTreeMultiToSinglePrepended
  })

  // after()
  insertionTest({
      testName     : 'multiple elements $.create after'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontasticFoo').after(createMulti())
                     }
    , expectedTree : expectedTreeMultiToSingleAppended
  })

  // appendTo()
  insertionTest({
      testName     : 'multiple elements $.create appendTo'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $(createMulti()).appendTo($('#insertiontastic'))
                     }
    , expectedTree : expectedTreeMultiToSingleAppended
  })

  // ()
  insertionTest({
      testName     : 'multiple elements $.create prependTo'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $(createMulti()).prependTo($('#insertiontastic'))
                     }
    , expectedTree : expectedTreeMultiToSinglePrepended
  })

  // insertBefore()
  insertionTest({
      testName     : 'multiple elements $.create insertBefore'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $(createMulti()).insertBefore($('#insertiontasticFoo'))
                     }
    , expectedTree : expectedTreeMultiToSinglePrepended
  })

  // insertAfter()
  insertionTest({
      testName     : 'multiple elements $.create insertAfter'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $(createMulti()).insertAfter($('#insertiontasticFoo'))
                     }
    , expectedTree : expectedTreeMultiToSingleAppended
  })

  /*********************************
   * Multiple HTML elements from document.createElement()
   */

  function createElementMulti () {
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
                       $('#insertiontastic').append(createElementMulti())
                     }
    , expectedTree : expectedTreeMultiToSingleAppended
  })

  // prepend()
  insertionTest({
      testName     : 'multiple elements createElement prepend'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontastic').prepend(createElementMulti())
                     }
    , expectedTree : expectedTreeMultiToSinglePrepended
  })

  // before()
  insertionTest({
      testName     : 'multiple elements createElement before'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontasticFoo').before(createElementMulti())
                     }
    , expectedTree : expectedTreeMultiToSinglePrepended
  })

  // after()
  insertionTest({
      testName     : 'multiple elements createElement after'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $('#insertiontasticFoo').after(createElementMulti())
                     }
    , expectedTree : expectedTreeMultiToSingleAppended
  })

  // appendTo()
  insertionTest({
      testName     : 'multiple elements createElement appendTo'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $(createElementMulti()).appendTo($('#insertiontastic'))
                     }
    , expectedTree : expectedTreeMultiToSingleAppended
  })

  // prependTo()
  insertionTest({
      testName     : 'multiple elements createElement prependTo'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $(createElementMulti()).prependTo($('#insertiontastic'))
                     }
    , expectedTree : expectedTreeMultiToSinglePrepended
  })

  // insertBefore()
  insertionTest({
      testName     : 'multiple elements createElement insertBefore'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $(createElementMulti()).insertBefore($('#insertiontasticFoo'))
                     }
    , expectedTree : expectedTreeMultiToSinglePrepended
  })

  // insertAfter()
  insertionTest({
      testName     : 'multiple elements createElement insertAfter'
    , fixtureHTML  : '<p id="insertiontasticFoo"></p>'
    , execute      : function () {
                       $(createElementMulti()).insertAfter($('#insertiontasticFoo'))
                     }
    , expectedTree : expectedTreeMultiToSingleAppended
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

  /*********************************
   * Single HTML element from $.create() to multiple targets
   */

  var multiTargetFixtureHTML = '<p class="insFoo1"><span class="inner1"></span></p><p class="insFoo2"><span class="inner2"></span></p><p class="insFoo3"><span class="inner3"></span></p>'
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


  // append()
  insertionTest({
      testName     : 'single element $.create append to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p').append(createSingle())
                     }
    , expectedTree : expectedTreeSingleToMultiAppended
  })

  // prepend()
  insertionTest({
      testName     : 'single element $.create prepend to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p').prepend(createSingle())
                     }
    , expectedTree : expectedTreeSingleToMultiPrepended
  })

  // before()
  insertionTest({
      testName     : 'single element $.create before to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p > span').before(createSingle())
                     }
    , expectedTree : expectedTreeSingleToMultiPrepended
  })

  // after()
  insertionTest({
      testName     : 'single element $.create after to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p > span').after(createSingle())
                     }
    , expectedTree : expectedTreeSingleToMultiAppended
  })

  // appendTo()
  insertionTest({
      testName     : 'single element $.create appendTo to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $(createSingle()).appendTo($('#insertiontastic > p'))
                     }
    , expectedTree : expectedTreeSingleToMultiAppended
  })

  // prependTo()
  insertionTest({
      testName     : 'single element $.create prependTo to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $(createSingle()).prependTo($('#insertiontastic > p'))
                     }
    , expectedTree : expectedTreeSingleToMultiPrepended
  })

  // insertBefore()
  insertionTest({
      testName     : 'single element $.create insertBefore to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $(createSingle()).insertBefore($('#insertiontastic > p > span'))
                     }
    , expectedTree : expectedTreeSingleToMultiPrepended
  })

  // insertAfter()
  insertionTest({
      testName     : 'single element $.create insertAfter to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $(createSingle()).insertAfter($('#insertiontastic > p > span'))
                     }
    , expectedTree : expectedTreeSingleToMultiAppended
  })

  /*********************************
   * Single HTML element from document.createElement() to multiple targets
   */

  // append()
  insertionTest({
      testName     : 'single element createElement() append to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p').append(createSingle())
                     }
    , expectedTree : expectedTreeSingleToMultiAppended
  })

  // prepend()
  insertionTest({
      testName     : 'single element createElement() prepend to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p').prepend(createSingle())
                     }
    , expectedTree : expectedTreeSingleToMultiPrepended
  })

  // before()
  insertionTest({
      testName     : 'single element createElement() before to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p > span').before(createSingle())
                     }
    , expectedTree : expectedTreeSingleToMultiPrepended
  })

  // after()
  insertionTest({
      testName     : 'single element createElement() after to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p > span').after(createSingle())
                     }
    , expectedTree : expectedTreeSingleToMultiAppended
  })

  // appendTo()
  insertionTest({
      testName     : 'single element createElement() appendTo to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $(createSingle()).appendTo($('#insertiontastic > p'))
                     }
    , expectedTree : expectedTreeSingleToMultiAppended
  })

  // prependTo()
  insertionTest({
      testName     : 'single element createElement() prependTo to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $(createSingle()).prependTo($('#insertiontastic > p'))
                     }
    , expectedTree : expectedTreeSingleToMultiPrepended
  })

  // insertBefore()
  insertionTest({
      testName     : 'single element createElement() insertBefore to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $(createSingle()).insertBefore($('#insertiontastic > p > span'))
                     }
    , expectedTree : expectedTreeSingleToMultiPrepended
  })

  // insertAfter()
  insertionTest({
      testName     : 'single element createElement() insertAfter to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $(createSingle()).insertAfter($('#insertiontastic > p > span'))
                     }
    , expectedTree : expectedTreeSingleToMultiAppended
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

  /*********************************
   * Miltiple HTML elements from $.create() to multiple targets
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
      testName     : 'multi elements $.create append to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p').append(createMulti())
                     }
    , expectedTree : expectedTreeMultiToMultiAppended
  })

  // prepend()
  insertionTest({
      testName     : 'multi elements $.create prepend to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p').prepend(createMulti())
                     }
    , expectedTree : expectedTreeMultiToMultiPrepended
  })

  // before()
  insertionTest({
      testName     : 'multi elements $.create before to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p > span').before(createMulti())
                     }
    , expectedTree : expectedTreeMultiToMultiPrepended
  })

  // after()
  insertionTest({
      testName     : 'multi elements $.create after to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p > span').after(createMulti())
                     }
    , expectedTree : expectedTreeMultiToMultiAppended
  })

  // appendTo()
  insertionTest({
      testName     : 'multi elements $.create appendTo to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $(createMulti()).appendTo($('#insertiontastic > p'))
                     }
    , expectedTree : expectedTreeMultiToMultiAppended
  })

  // prependTo()
  insertionTest({
      testName     : 'multi elements $.create prependTo to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $(createMulti()).prependTo($('#insertiontastic > p'))
                     }
    , expectedTree : expectedTreeMultiToMultiPrepended
  })

  // insertBefore()
  insertionTest({
      testName     : 'multi elements $.create insertBefore to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $(createMulti()).insertBefore($('#insertiontastic > p > span'))
                     }
    , expectedTree : expectedTreeMultiToMultiPrepended
  })

  // insertAfter()
  insertionTest({
      testName     : 'multi element $.create insertAfter to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $(createMulti()).insertAfter($('#insertiontastic > p > span'))
                     }
    , expectedTree : expectedTreeMultiToMultiAppended
  })

  /*********************************
   * Miltiple HTML elements from document.createElement() to multiple targets
   */

  // append()
  insertionTest({
      testName     : 'multi elements createElement() append to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p').append(createElementMulti())
                     }
    , expectedTree : expectedTreeMultiToMultiAppended
  })

  // prepend()
  insertionTest({
      testName     : 'multi elements createElement() prepend to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p').prepend(createElementMulti())
                     }
    , expectedTree : expectedTreeMultiToMultiPrepended
  })

  // before()
  insertionTest({
      testName     : 'multi elements createElement() before to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p > span').before(createElementMulti())
                     }
    , expectedTree : expectedTreeMultiToMultiPrepended
  })

  // after()
  insertionTest({
      testName     : 'multi elements createElement() after to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p > span').after(createElementMulti())
                     }
    , expectedTree : expectedTreeMultiToMultiAppended
  })

  // appendTo()
  insertionTest({
      testName     : 'multi elements createElement() appendTo to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $(createElementMulti()).appendTo($('#insertiontastic > p'))
                     }
    , expectedTree : expectedTreeMultiToMultiAppended
  })

  // prependTo()
  insertionTest({
      testName     : 'multi elements createElement() prependTo to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $(createElementMulti()).prependTo($('#insertiontastic > p'))
                     }
    , expectedTree : expectedTreeMultiToMultiPrepended
  })

  // insertBefore()
  insertionTest({
      testName     : 'multi elements createElement() insertBefore to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $(createElementMulti()).insertBefore($('#insertiontastic > p > span'))
                     }
    , expectedTree : expectedTreeMultiToMultiPrepended
  })

  // insertAfter()
  insertionTest({
      testName     : 'multi element createElement() insertAfter to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $(createElementMulti()).insertAfter($('#insertiontastic > p > span'))
                     }
    , expectedTree : expectedTreeMultiToMultiAppended
  })

  /*********************************
   * Miltiple HTML elements from html string to multiple targets
   */

  // append()
  insertionTest({
      testName     : 'multi elements html string append to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p').append(htmlMultiStr)
                     }
    , expectedTree : expectedTreeMultiToMultiAppended
  })

  // prepend()
  insertionTest({
      testName     : 'multi elements html string prepend to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p').prepend(htmlMultiStr)
                     }
    , expectedTree : expectedTreeMultiToMultiPrepended
  })

  // before()
  insertionTest({
      testName     : 'multi elements html string before to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p > span').before(htmlMultiStr)
                     }
    , expectedTree : expectedTreeMultiToMultiPrepended
  })

  // after()
  insertionTest({
      testName     : 'multi elements html string after to multiple targets'
    , fixtureHTML  : multiTargetFixtureHTML
    , execute      : function () {
                       $('#insertiontastic > p > span').after(htmlMultiStr)
                     }
    , expectedTree : expectedTreeMultiToMultiAppended
  })

})