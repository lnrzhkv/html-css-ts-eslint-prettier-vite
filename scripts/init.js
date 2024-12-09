const { exec } = require('child_process');
const {
  existsSync,
  unlinkSync,
  lstatSync,
  readdirSync,
  rmdirSync,
} = require('fs');
const { join } = require('path');

const COLORS = {
  RESET: '\x1b[0m',
  RED: '\x1b[31m',
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  CYAN: '\x1b[36m',
};

const log = {
  info: (message) => console.log(`${COLORS.CYAN}[INFO]${COLORS.RESET} ${message}`),
  warn: (message) => console.log(`${COLORS.YELLOW}[WARNING]${COLORS.RESET} ${message}`),
  error: (message) => console.log(`${COLORS.RED}[ERROR]${COLORS.RESET} ${message}`),
  success: (message) => console.log(`${COLORS.GREEN}[SUCCESS]${COLORS.RESET} ${message}`),
};

const deleteFolderRecursive = (path) => {
  if (existsSync(path)) {
    log.info(`Deleting Directory: ${path}`);
    readdirSync(path).forEach((file) => {
      const curPath = join(path, file);
      if (lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        log.info(`Deleting File: ${curPath}`);
        unlinkSync(curPath);
      }
    });
    rmdirSync(path);
  } else {
    log.warn(`Directory not found: ${path}`);
  }
};

const filesToDelete = ['package-lock.json', 'yarn.lock'];
const foldersToDelete = ['node_modules'];

log.info('Starting to delete files...');
filesToDelete.forEach((file) => {
  if (existsSync(file)) {
    log.info(`Deleting File: ${file}`);
    unlinkSync(file);
  } else {
    log.warn(`File not found: ${file}`);
  }
});
log.success('Finished deleting files.');

log.info('Starting to delete directories...');
foldersToDelete.forEach((folder) => {
  deleteFolderRecursive(folder);
});
log.success('Finished deleting directories.');

log.info("Running 'npm cache verify' and 'npm install'...");

const npmCommands = ['npm cache verify', 'npm install'];
const isWindows = process.platform === 'win32';

npmCommands.forEach((command, index) => {
  const installProcess = exec(command, (error, stdout, stderr) => {
    if (error) {
      log.error(`Error executing command '${command}': ${error.message}`);
      return;
    }
    if (stderr) {
      log.error(stderr);
    }
    if (stdout) {
      const lines = stdout.toString().split('\n');
      lines.forEach((line) => {
        const trimmedLine = line.trim();
        if (trimmedLine.toLowerCase().startsWith('npm warn')) {
          log.warn(trimmedLine);
        } else if (trimmedLine.toLowerCase().startsWith('npm err!')) {
          log.error(trimmedLine);
        } else if (trimmedLine.length > 0) {
          console.log(`${COLORS.GREEN}[npm]${COLORS.RESET} ${trimmedLine}`);
        }
      });
    }
  });

  installProcess.on('close', (code) => {
    if (code === 0) {
      if (command === 'npm install') {
        log.success('npm install completed successfully! 🚀🚀🚀');
        log.success('📝 don\'t forget to change .env');
        log.success('🌟 use \'npm start\' to bootstrap the application.');
        log.success('🌟 use \'npm run storybook\' to bootstrap storybook.');
        log.success('🌟 use \'npm run test:unit\' to run all test suites.');
      } else {
      log.success(`Command '${command}' completed successfully! 🚀`);

      }
    } else {
      log.error(`Command '${command}' failed with code ${code}. 🚨`);
    }

    // Запускаем следующую команду только если текущая завершена успешно
    if (index === 0 && code === 0) {
      if (isWindows) {
        exec('npm install', (error, stdout, stderr) => {
          if (error) {
            log.error(`Error executing 'npm install': ${error.message} 🚨`);
            return;
          }
          if (stderr) {
            log.error(stderr);
          }
          if (stdout) {
            const lines = stdout.toString().split('\n');
            lines.forEach((line) => {
              const trimmedLine = line.trim();
              if (trimmedLine.toLowerCase().startsWith('npm warn')) {
                log.warn(trimmedLine);
              } else if (trimmedLine.toLowerCase().startsWith('npm err!')) {
                log.error(trimmedLine);
              } else if (trimmedLine.length > 0) {
                console.log(`${COLORS.GREEN}[npm]${COLORS.RESET} ${trimmedLine}`);
              }
            });
          }
        });
      }
    }
  });
});

