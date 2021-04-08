module.exports = {
  apps : [{
    script: 'server.js',
    watch: '.'
  }, {
    script: './service-worker/',
    watch: ['./service-worker']
  }],

  deploy : {
    production : {
      user : 'deploy',
      host : 'api.xn--mdaaa.ee',
      ref  : 'origin/main',
      repo : 'https://github.com/cenotaph/picserver',
      path : '/var/www/õõõ/reno',
      'pre-deploy-local': '',
      'post-deploy' : 'ln -sf /var/www/õõõ/reno/shared/data /var/www/õõõ/reno/current/data && cp /var/www/õõõ/reno/shared/.passwd /var/www/õõõ/reno/current && npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
