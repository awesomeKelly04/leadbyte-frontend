import { config } from "vue/types/umd";

export function chainWebpack(config) {
    config.module
        .rule('raw')
        .test(/\.txt$/)
        .use('raw-loader')
        .loader('raw-loader')
        .end();
}