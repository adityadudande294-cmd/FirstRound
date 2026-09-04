const { JSDOM } = require('jsdom');
const fs = require('fs');
const css = fs.readFileSync('dist/assets/index-184PN25H.css','utf8');
const html = `<html><head><style>${css}</style></head><body><div class="bg-primary" id="btn"></div></body></html>`;
const dom = new JSDOM(html);
const el = dom.window.document.documentElement;
const btn = dom.window.document.getElementById('btn');

el.setAttribute('data-theme', 'classic');
console.log('Classic:', dom.window.getComputedStyle(btn).getPropertyValue('background-color'));

el.setAttribute('data-theme', 'new');
console.log('New:', dom.window.getComputedStyle(btn).getPropertyValue('background-color'));
