require('dotenv').config();

const jsonServer = require('json-server');
const queryString = require('query-string');
const server = jsonServer.create();
const router = jsonServer.router('db.json');

router.render = (req, res) => {
	const headers = res.getHeaders();

	const totalCountHeader = headers['x-total-count'];
	if (req.method === 'GET' && totalCountHeader) {
		const queryParams = queryString.parse(req._parsedUrl.query);

		const result = {
			data: res.locals.data,
			pagination: {
				_page: Number.parseInt(queryParams._page) || 1,
				_limit: Number.parseInt(queryParams._limit) || 10,
				_totalRows: Number.parseInt(totalCountHeader),
			},
		};

		return res.jsonp(result);
	}

	res.jsonp(res.locals.data);
};

// Use default router
server.use('/api', router);
server.listen(3000, () => {
	console.log('JSON Server is running at port: ', 3000);
});
