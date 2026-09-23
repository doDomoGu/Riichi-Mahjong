function listenWithFallback(server, port, host, callback) {
  let currentPort = port;
  // 生产环境下端口被占用时直接报错退出，交给 systemd 重启并在
  // status 里显示 failed；本地开发（多实例并跑）才需要自动换端口，
  // 否则服务器上一旦端口被别的进程占了，服务会静默漂到别的端口，
  // 而 nginx/网关那边配置的还是原端口，故障会很难发现。
  const allowFallback = process.env.NODE_ENV !== 'production';

  function listen() {
    const handleError = (error) => {
      server.removeListener('error', handleError);
      if (allowFallback && error.code === 'EADDRINUSE') {
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
