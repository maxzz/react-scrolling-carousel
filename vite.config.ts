import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import fs from 'fs';
import path from 'path';

function copyExtra() {
    return {
        name: 'copy-extra',
        async buildEnd() {
            let indexHtml = path.join(__dirname, 'dist', 'index.html');
            let cnt = fs.readFileSync(indexHtml).toString();
            console.log('\n\n--------------\n', indexHtml, cnt);
        }
    };
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        reactRefresh(),
        copyExtra()
    ]
})
