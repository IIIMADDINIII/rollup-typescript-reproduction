import { defineConfig } from "rollup";
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default defineConfig({
    input: 'src/index.ts',
    output: {
        file: 'build/bundle.js',
        format: "commonjs",
    },
    plugins: [typescript({ noEmitOnError: true, outputToFilesystem: true }), nodeResolve()]
});