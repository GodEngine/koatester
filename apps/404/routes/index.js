'use strict';

module.exports = function(router, logger) {
  router.get('/', function*(next) {
    this.state = {
      sharebar: this.sharebar
    }
    yield this.render('index');
    yield next;
  });
};
