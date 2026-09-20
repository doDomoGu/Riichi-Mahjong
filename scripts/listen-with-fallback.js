function listenWithFallback(server, port, host, callback) {
  let currentPort = port;

  function listen() {
    const handleError = (error) => {
      server.removeListener('error', handleError);
      if (error.code === 'EADDRINUSE') {
        currentPort += 1;
        listen();
        return;
      }
      throw error;
    };

    server.once('error', handleError);
    server.listen(currentPort, host, () => {
      server.removeListener('error', handleError);
      callback(currentPort);
    });
  }

  listen();
}

module.exports = listenWithFallback;
