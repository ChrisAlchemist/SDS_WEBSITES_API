const ftp = require("basic-ftp")

async function createFile(conection, data,namefile){
    const client = new ftp.Client()
    //client.ftp.verbose = true; //descomentar si se requiere ver log de ftp
    try {
        await client.access({
            host: conection.servidorFtp,
            user: conection.usuarioFtp,
            password: conection.passwordFtp,
            secure: true,
            keepalive: 120000, // 120 segundos, por ejemplo
        })
        client.uploadFrom(data, `${conection.pathFtp}/${namefile}`);
    }
    catch(err) {
        console.log(err)
    }
    
}

module.exports = {
    createFile
}