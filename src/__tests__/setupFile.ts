jest.mock<typeof import('@/shared/config/envConfig.js')>('@/shared/config/envConfig.js', () => {
  const originalEnvConfigModule = jest.requireActual<typeof import('@/shared/config/envConfig.js')>('@/shared/config/envConfig.js');
  return {
    ...originalEnvConfigModule,
    ENV_CTS_CLIENT_ID: 'mockValue',
    ENV_CTS_PROJECT_KEY: 'mockValue',
    ENV_CTS_CLIENT_SECRET: 'mockValue',
    ENV_CTS_API_HOST: 'https://somesite.com',
    ENV_CTS_AUTH_HOST: 'https://somesite.com',
    ENV_CTS_SCOPES: '["mockScope","mockScope2"]',
    ENV_ENCRYPTION_KEY_HEX: 'd970ae075cd4ecf5a1258279db5b0254954045cdcd1bff1683e3680705c31264'
  };
});
