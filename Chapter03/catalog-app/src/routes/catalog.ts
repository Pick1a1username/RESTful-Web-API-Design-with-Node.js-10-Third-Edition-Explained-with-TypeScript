import * as express from 'express';

import * as catalog from '../modules/catalog';

const router = express.Router();

router.get('/', function(request, response, next) {
  var categories = catalog.findCategoryies();
  response.json(categories);
});

router.get('/:categoryId', function(request, response, next) {
  var categories = catalog.findItems(request.params.categoryId);
  if (categories === undefined) {
    response.writeHead(404, {'Content-Type' : 'text/plain'});
    response.end('Not found');
  } else {
    response.json(categories);
  }
});

router.get('/:categoryId/:itemId', function(request, response, next) {
  var item = catalog.findItem(request.params.categoryId, request.params.itemId);
  if (item === undefined) {
    response.writeHead(404, {'Content-Type' : 'text/plain'});
    response.end('Not found');
  } else {
  response.json(item);
  }
});

export default router;