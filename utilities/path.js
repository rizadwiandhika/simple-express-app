const path = require('path')

// require.main.filename itu memberi path ke file utama aplikasi kita which mean "app.js"
// Lalu dengan path.dirname() kita mendapatkan path directorinya dari "app.js"
exports.rootDirectory = path.dirname(require.main.filename)
