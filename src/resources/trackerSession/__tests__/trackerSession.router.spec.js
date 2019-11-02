import router from '../trackerSession.router';

describe('trackerSession router', () => {
  test('has crud routes', () => {
    const routes = [{ path: '/inactive', method: 'get' }];

    routes.forEach(route => {
      const match = router.stack.find(
        s => s.route.path === route.path && s.route.methods[route.method]
      );
      expect(match).toBeTruthy();
    });
  });
});
