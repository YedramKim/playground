const route = {};

route.path = '/';

route.methods = 'get';

route.pre = [
	{
		name: 'useRenderer',
		data: {
			title: '테스트',
			location: '/',
		},
	}
];

route.handler = async (context, req, res) => {
	const html = await res.renderer.render();

	res.send(html);
};

module.exports = route;
