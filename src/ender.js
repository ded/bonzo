!function () {
  var b = bonzo.noConflict();
  $.ender(b);
  $.ender(b(), true);
  $.ender({
    create: function (node) {
      return $(b.create(node));
    }
  });
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
      this.elements = [];
      for (i = 0, l = this.length; i < l; i++) {
        delete this[i];
      }
      for (i = 0, l = r.length; i < l; i++) {
        this[i] = r[i];
      }
      this.length = r.length;
      return this;
    }
  }, true);

}();

