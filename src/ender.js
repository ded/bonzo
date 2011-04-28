!function () {
  var b = bonzo.noConflict();
  $.ender(b);
  $.ender(b(), true);
  $.ender({
    create: function (node) {
      return $(b.create(node));
    }
  });

  function indexOf(ar, val) {
    for (var i = 0; i < ar.length; i++) {
      if ( ar[i] === val ) {
        return i;
      }
    }
    return -1;
  }

  function uniq(ar) {
    var a = [], i, j;
    label:
    for (i = 0; i < ar.length; i++) {
      for (j = 0; j < a.length; j++) {
        if (a[j] == ar[i]) {
          continue label;
        }
      }
      a[a.length] = ar[i];
    }
    return a;
  }
  $.ender({
    parents: function (selector, closest) {
      var collection = $(selector), j, k, p, r = [];
      for (j = 0, k = this.length; j < k; j++) {
        p = this[j];
        while (p = p.parentNode) {
          if (indexOf(collection, p) !== -1) {
            r.push(p);
            if (closest) break;
          }
        }
      }
      return $(uniq(r));
    },

    closest: function (selector) {
      return this.parents(selector, true);
    },

    first: function () {
      return $(this[0]);
    },

    last: function () {
      return $(this[this.length - 1]);
    },

    next: function () {
      return $(b(this).next());
    },

    previous: function () {
      return $(b(this).previous());
    },

    siblings: function () {
      var i, l, p, r = [];
      for (i = 0, l = this.length; i < l; i++) {
        p = this[i];
        while (p = p.previousSibling) {
          p.nodeType == 1 && r.push(p);
        }
        p = this[i];
        while (p = p.nextSibling) {
          p.nodeType == 1 && r.push(p);
        }
      }
      return $(uniq(r));
    }
  }, true);

}();
