const { spawn } = require('child_process');
const net = require('net');
const path = require('path');

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const projectCommands = {
  gateway: {
    command: process.execPath,
    args: [path.join('server', 'index.js')],
    label: 'gateway',
    port: 8080,
  },
  wind: {
    command: npmCommand,
    args: ['start'],
    cwd: 'wind',
    label: 'wind',
    port: 3001,
  },
  'score-practice': {
    command: process.execPath,
    args: [path.join('score-practice', 'server', 'index.js')],
    label: 'score-practice',
    port: 3002,
  },
  home: {
    command: process.execPath,
    args: [path.join('home', 'server', 'index.js')],
    label: 'home',
    port: 3000,
  },
};

const aliases = {
  all: ['home', 'wind', 'score-practice', 'gateway'],
  gateway: ['gateway'],
  home: ['home'],
  wind: ['wind'],
  'score-practice': ['score-practice'],
};

function selectedProjects(args) {
  if (!args.length) return aliases.all;
  const names = args.flatMap((arg) => aliases[arg.replace(/^--/, '')] || []);
  const unknown = args.filter((arg) => !aliases[arg.replace(/^--/, '')]);
  if (unknown.length || !names.length) {
    throw new Error(
      `用法：npm start [gateway] [home] [wind] [score-practice]\n未知参数：${unknown.join(', ')}`,
    );
  }
  return [...new Set(names)];
}

const children = [];

function stopAll(exitCode = 0) {
  children.forEach((child) => {
    if (!child.killed) child.kill('SIGTERM');
  });
  process.exit(exitCode);
}

function isPortAvailable(port) {
  return new Promise((resolve) => {
    const probe = net.createServer();
    probe.once('error', () => resolve(false));
    probe.once('listening', () => probe.close(() => resolve(true)));
    probe.listen(port, '127.0.0.1');
  });
}

async function nextAvailablePort(start, usedPorts) {
  let port = start;
  while (usedPorts.has(port) || !(await isPortAvailable(port))) port += 1;
  usedPorts.add(port);
  return port;
}

async function startSelectedProjects() {
  const names = selectedProjects(process.argv.slice(2));
  const assignedPorts = {};
  const usedPorts = new Set();

  for (const name of names) {
    assignedPorts[name] = await nextAvailablePort(projectCommands[name].port, usedPorts);
  }

  names.forEach((name) => {
    const config = projectCommands[name];
    const env = {
      ...process.env,
      PORT: String(assignedPorts[name]),
    };
    if (name === 'gateway') {
      env.HOME_TARGET = `http://127.0.0.1:${assignedPorts.home || 3000}`;
      env.WIND_TARGET = `http://127.0.0.1:${assignedPorts.wind || 3001}`;
      env.SCORE_PRACTICE_TARGET =
        `http://127.0.0.1:${assignedPorts['score-practice'] || 3002}`;
    }
    const child = spawn(config.command, config.args, {
      cwd: config.cwd ? path.join(__dirname, '..', config.cwd) : path.join(__dirname, '..'),
      env,
      stdio: 'inherit',
    });
    children.push(child);
    console.log(`[${config.label}] 使用端口 ${assignedPorts[name]}`);
    child.on('exit', (code, signal) => {
      if (signal !== 'SIGTERM') {
        console.error(`[${config.label}] 已退出，正在停止其他服务。`);
        stopAll(code || 1);
      }
    });
  });
}

startSelectedProjects().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

process.on('SIGINT', () => stopAll());
process.on('SIGTERM', () => stopAll());
