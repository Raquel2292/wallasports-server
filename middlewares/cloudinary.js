const cloudinary = require ('cloudinary').v2
const multer = require('multer');
const {CloudinaryStorage} = require('multer-storage-cloudinary');

cloudinary.config({ //claves
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})


const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        allowedFormats: ["jpg", "png","jpeg"], //formatos permitidos
        folder: "wallaSports" //nombre de la carpeta que se me crea en cloudinary
    }
})

const uploader = multer({ //sube las imagenes
    storage //es lo que he creado arriba
})

//npm install cloudinary multer multer-storage-cloudinary

module.exports = uploader