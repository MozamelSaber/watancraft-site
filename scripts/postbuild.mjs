import {copyFileSync} from 'node:fs';
// Preserve the custom domain and direct links to legacy season pages on GitHub Pages.
copyFileSync('CNAME','dist/CNAME');
copyFileSync('dist/index.html','dist/404.html');
