const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = class ServerMiniCssExtractPlugin extends MiniCssExtractPlugin {
    getCssChunkObject() {
        return {};
    }
};
