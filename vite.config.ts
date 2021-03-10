import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import fs from 'fs';
import path from 'path';

function copyExtra() {
    return {
        name: 'copy-extra',
        async closeBundle() {
            let indexHtml = path.join(__dirname, 'dist', 'index.html');
            let indexPhp = path.join(__dirname, 'dist', 'index.php');

            let cnt = fs.readFileSync(indexHtml).toString();
            cnt = `here i am\n${cnt}`;
            fs.writeFileSync(indexPhp, cnt);
            console.log('\n\-------------\n', indexHtml, cnt);
            //console.log('\n\n--------------\n', indexHtml);
        }
    };
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        reactRefresh(),
        //copyExtra()
    ]
})
