import router from '../auth.router';

describe('auth router', () => {
  test('has crud routes', () => {
    const routes = [
      { path: '/signup', method: 'post' },
      { path: '/login', method: 'post' },
      { path: '/logout', method: 'post' },
    ];

    routes.forEach(route => {
      const match = router.stack.find(
        s => s.route.path === route.path && s.route.methods[route.method]
      );
      expect(match).toBeTruthy();
    });
  });
});
