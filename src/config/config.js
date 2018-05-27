'use strict';

const convict = require('convict');

module.exports = convict({
    ENV: {
        doc: 'The application environment.',
        format: ['production', 'development', 'test'],
        default: 'development',
        env: 'NODE_ENV',
    },
    PORT: {
        doc: 'The port on which the server is running',
        format: Number,
        default: 3001,
        env: 'PORT',
    },
});
