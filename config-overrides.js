const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
    config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
    config = rewireLess.withLoaderOptions({
        modifyVars: { 
            '@primary-color': '#F4726F',
            '@font-family': 'Nunito',
            '@layout-body-background': '#FFF',
            '@btn-font-weight': 'bold',
            '@border-radius-base': '2px',
            '@input-height-lg': '50px'
        },
    })(config, env);
    return config;
};