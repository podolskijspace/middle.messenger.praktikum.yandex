const register = require('@babel/register').default;
const {JSDOM} = require("jsdom");

register({
    presets: [
        '@babel/preset-typescript',
        '@babel/preset-env'
    ],
    extensions: ['.ts', '.tsx', '.js', '.jsx']
});


const {window} = new JSDOM('<div id="app"></div>', {url: 'https://localhost'});

global.window = window;
global.document = window.document;
global.XMLHttpRequest = window.XMLHttpRequest;
global.Node = window.Node;
