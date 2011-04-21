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
      var collection = $(selector), i, l, j, k, r = [];
      collect:
      for (i = 0, l = collection.length; i < l; i++) {
        for (j = 0, k = this.length; j < k; j++) {
          if (b.isAncestor(collection[i], this[j])) {
            r.push(collection[i]);
            continue collect;
          }
        }
      }
      return b(uniq(collection));
    }
  }, true);

}();
