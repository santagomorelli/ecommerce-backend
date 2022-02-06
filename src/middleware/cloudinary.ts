const cloudinary = require('cloudinary');

export const uploadImage = (imageDir: String, imageName: String): any => {

    cloudinary.v2.uploader.upload(`${imageDir}`,
  { public_id: `${imageName}` }, 
  function(error: any, result: any) {console.log(result); });
}
