module.exports = {
  apps : [{
    script: 'server.js',
    watch: '.'
  }],

  deploy : {
    production : {
      user : 'deploy',
      host : 'api.xn--mdaaa.ee',
      ref  : 'origin/main',
      repo : 'https://github.com/cenotaph/picserver',
      path : '/var/www/õõõ/reno/api',
      'pre-deploy-local': '',
      'post-deploy' : 'ln -sf /var/www/õõõ/reno/api/shared/data /var/www/õõõ/reno/api/current && cp /var/www/õõõ/reno/api/shared/.passwd /var/www/õõõ/reno/api/current && npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
