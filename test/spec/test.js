/* global describe, it */

(function () {
  'use strict';

  describe('Item creation', function () {

    it('should be an instance of toDo', function() {
      expect(item).to.be.an.instanceof(toDo);
    });

    it('should be incomplete by default', function() {
      expect(item.status).to.equal('incomplete');
    });

  });//ends describe


})();
