require("dotenv").config({ path: "./config.env" });
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadImage(filePath) {
    return await cloudinary.uploader.upload(filePath, {
        folder: "productMERN",
    });
}

async function deleteImage(public_id) {
    return await cloudinary.uploader.destroy(public_id);
}

module.exports = {
    uploadImage,
    deleteImage,
};
