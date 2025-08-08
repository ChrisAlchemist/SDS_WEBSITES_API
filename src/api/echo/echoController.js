const configGlobal = require('../../config/config');

async function echo(req, res) {
    try {
        res.status(200).json({ 
            status: 200, 
            message: "Correct access to service",
            version: configGlobal.VERSION
        });
    } catch (err) {
        res.status(500).json({ status: 500, message: "Error internal server" });
    }
}


module.exports = {
    echo
}