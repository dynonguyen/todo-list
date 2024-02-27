import cors from 'cors';
import jsonServer from 'json-server';
import morgan from 'morgan';
import queryString from 'query-string';

const server = jsonServer.create();
const router = jsonServer.router('db.json');

router.render = (req, res) => {
	const headers = res.getHeaders();

	const totalCountHeader = headers['x-total-count'];
	if (req.method === 'GET' && totalCountHeader) {
		const queryParams = queryString.parse(req._parsedUrl.query);

		const result = {
			docs: res.locals.data,
			pagination: {
				_page: Number.parseInt(queryParams._page) || 1,
				_limit: Number.parseInt(queryParams._limit) || 10,
				_total: Number.parseInt(totalCountHeader),
			},
		};

		return res.jsonp(result);
	}

	res.jsonp(res.locals.data);
};

server.use(cors());
server.use(morgan('dev'));
server.use('/api', router);

const PORT = 3000;
server.listen(PORT, () => {
	console.log('JSON Server is running at port', PORT);
});
