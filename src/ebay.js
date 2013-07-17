(function(){
  if (!String.prototype.replaceEbay) {
    String.prototype.replaceEbay = function () {
      return (String.prototype['replace']).apply(this, arguments);
    }
  }
})();
