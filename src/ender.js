!function () {
  var b = bonzo.noConflict();
  $.ender(b);
  $.ender(b(), true);
  $.ender({
    create: function (node) {
      return $(b.create(node));
    }
  });
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
    parents: function (selector) {
      var collection = $(selector), i, j, k, r = [];
      collect:
      for (i = collection.length - 1; i >= 0; i--) {
        for (j = 0, k = this.length; j < k; j++) {
          if (b.isAncestor(collection[i], this[j])) {
            r.push(collection[i]);
            continue collect;
          }
        }
      }
      return $(uniq(collection));
    },

    first: function () {
      return $(this[0]);
    },

    last: function () {
      return $(this[this.length - 1]);
    },

    next: function () {
      return this.related('nextSibling', $);
    },

    previous: function () {
      return this.related('previousSibling', $);
    }
  }, true);

}();
