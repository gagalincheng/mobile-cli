module.exports = app => {
    const { router, controller, config } = app;
    const adaptor = app.middleware.adaptor();

    router.post('/apis.json', adaptor, controller.apis.index);
  };