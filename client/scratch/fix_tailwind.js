/* eslint-disable */
const fs = require('fs');
const path = require('path');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // Fix px values inside brackets: w-[700px] -> w-175, except for rounded
    content = content.replace(/([a-zA-Z0-9:-]+)-\[([0-9]+)px\]/g, (match, prefix, pxStr) => {
        if (prefix.includes('rounded')) return match; // skip rounded for now
        const px = parseInt(pxStr, 10);
        if (px === 1) return `${prefix}-px`;
        const val = px / 4;
        return `${prefix}-${val}`;
    });

    // Fix negative px values
    content = content.replace(/([a-zA-Z0-9:-]+)-\[-([0-9]+)px\]/g, (match, prefix, pxStr) => {
        const px = parseInt(pxStr, 10);
        let prefixParts = prefix.split(':');
        let basePrefix = prefixParts.pop();
        let responsive = prefixParts.length > 0 ? prefixParts.join(':') + ':' : '';
        if (px === 1) return `${responsive}-${basePrefix}-px`;
        return `${responsive}-${basePrefix}-${px/4}`;
    });

    // Opacity values: bg-black/[0.02] -> bg-black/2
    content = content.replace(/([a-zA-Z0-9#:-]+)\/\[0\.([0-9]+)\]/g, (match, prefix, fracStr) => {
        const num = parseFloat(`0.${fracStr}`);
        const pct = Math.round(num * 100);
        return `${prefix}/${pct}`;
    });

    // Rounded borders
    content = content.replace(/rounded-\[32px\]/g, 'rounded-4xl');
    content = content.replace(/rounded-\[24px\]/g, 'rounded-3xl');
    content = content.replace(/rounded-\[16px\]/g, 'rounded-2xl');
    
    // Gradients
    content = content.replace(/bg-gradient-to-(b|t|r|l|br|bl|tr|tl)/g, 'bg-linear-to-$1');

    // CSS variables
    content = content.replace(/\[var\((--[a-zA-Z0-9-]+)\)\]/g, '($1)');

    // !important (targeted)
    content = content.replace(/!(font-[a-zA-Z0-9-]+)/g, '$1!');

    // Negative translations
    content = content.replace(/-translate-([xy])-\[([0-9]+)%\]/g, 'translate-$1-[-$2%]');

    // order-none
    content = content.replace(/order-none/g, 'order-0');

    // min-h-[100svh]
    content = content.replace(/min-h-\[100svh\]/g, 'min-h-svh');

    // tracking
    content = content.replace(/tracking-\[-0\.05em\]/g, 'tracking-tighter');
    content = content.replace(/tracking-\[0\.1em\]/g, 'tracking-widest');

    // aspect
    content = content.replace(/aspect-\[2\/3\]/g, 'aspect-2/3');

    // radial gradient spaces
    content = content.replace(/_rgba/g, 'rgba');
    content = content.replace(/,_#/g, ',#');

    // stroke
    content = content.replace(/stroke-\[2\]/g, 'stroke-2');

    // leading
    content = content.replace(/leading-\[1\.0\]/g, 'leading-none');

    // z-index
    content = content.replace(/z-\[([0-9]+)\]/g, 'z-$1');

    // negative rems
    content = content.replace(/([a-zA-Z0-9:-]+)-\[-([0-9]+)rem\]/g, (match, prefix, remStr) => {
        const rem = parseInt(remStr, 10);
        let prefixParts = prefix.split(':');
        let basePrefix = prefixParts.pop();
        let responsive = prefixParts.length > 0 ? prefixParts.join(':') + ':' : '';
        return `${responsive}-${basePrefix}-${rem * 4}`;
    });

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    }
}

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
            processFile(fullPath);
        }
    }
}

walk('./src');
