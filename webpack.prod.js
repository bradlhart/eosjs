const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        eosjs_api: './src/eosjs-api.ts',
        eosjs_jsonrpc: './src/rpc-web.ts',
        eosjs_jssig: './src/eosjs-jssig.ts',
        eosjs_numeric: './src/eosjs-numeric.ts',
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: 'tsconfig.web.json'
                    }
                },
                exclude: /node_modules/,
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['**/*'] })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: x => x.chunk.name.replace('_', '-') + '.min.js',
        library: '[name]',
        path: path.resolve(__dirname, 'dist-web'),
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'externals',
                    filename: 'externals.min.js',
                    chunks: 'all'
                },
            },
        },
    }
};
