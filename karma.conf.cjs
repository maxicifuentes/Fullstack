module.exports = function configure(config) {
  // Evidencia de cada caso para el informe, sin dependencias adicionales.
  function CaseListReporter(baseReporterDecorator) {
    baseReporterDecorator(this);
    const cases = [];
    this.onSpecComplete = (browser, result) => cases.push({
      suite: result.suite.join(' / '), caso: result.description,
      aprobado: result.success, omitido: result.skipped, duracionMs: result.time,
    });
    this.onRunComplete = () => {
      const fs = require('node:fs');
      fs.mkdirSync('coverage', { recursive: true });
      fs.writeFileSync('coverage/test-results.json', JSON.stringify(cases, null, 2));
    };
  }
  CaseListReporter.$inject = ['baseReporterDecorator'];
  // CHROME_BIN permite elegir navegador; en Windows también detectamos Edge.
  if (!process.env.CHROME_BIN && process.platform === 'win32') {
    const fs = require('node:fs');
    const path = require('node:path');
    const roots = [process.env.PROGRAMFILES, process.env['PROGRAMFILES(X86)'], process.env.LOCALAPPDATA].filter(Boolean);
    const candidates = roots.flatMap((root) => ['Google/Chrome/Application/chrome.exe', 'Microsoft/Edge/Application/msedge.exe'].map((file) => path.join(root, file)));
    const found = candidates.find((file) => fs.existsSync(file));
    if (found) process.env.CHROME_BIN = found;
  }
  config.set({
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-webpack'),
      require('karma-coverage'),
      { 'reporter:case-list': ['type', CaseListReporter] },
    ],
    frameworks: ['jasmine'],
    files: [{ pattern: 'src/**/*.spec.jsx', watched: false }],
    preprocessors: { 'src/**/*.spec.jsx': ['webpack'] },
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      module: {
        rules: [{
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { targets: 'defaults' }], ['@babel/preset-react', { runtime: 'automatic' }]],
              plugins: [['istanbul', { exclude: ['**/*.spec.jsx', '**/node_modules/**', '**/src/main.jsx'] }]],
            },
          },
        }],
      },
      resolve: { extensions: ['.js', '.jsx'] },
    },
    coverageReporter: {
      dir: 'coverage',
      check: { global: { statements: 95, branches: 90, functions: 95, lines: 95 } },
      reporters: [{ type: 'text-summary' }, { type: 'html', subdir: 'html' }, { type: 'json-summary', subdir: '.', file: 'coverage-summary.json' }, { type: 'json', subdir: '.', file: 'coverage-final.json' }],
    },
    reporters: ['progress', 'coverage', 'case-list'],
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu'],
      },
    },
    singleRun: true,
    client: { clearContext: false },
  });
};
