import router from '../location.router';

describe('location router', () => {
  test('has crud routes', () => {
    const routes = [
      { path: '/', method: 'post' },
      { path: '/active', method: 'get' },
    ];

    routes.forEach(route => {
      const match = router.stack.find(
        s => s.route.path === route.path && s.route.methods[route.method]
      );
      expect(match).toBeTruthy();
    });
  });
});
