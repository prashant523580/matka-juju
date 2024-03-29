// const UPLOAD_PRESET = "g1ybg5su";
const CLOUD_NAME = "db4vgbevh";
export const uploadImage = async (image: any, UPLOAD_PRESET: any) => {
    // if (!userImage) {
    //   toast.error("Select image to process.")
    //   return false
    // }
    const formData = new FormData()

    formData.append("file", image)
    formData.append("upload_preset", UPLOAD_PRESET)

    try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
            method: "POST",
            body: formData
        })

        const data = await res.json()
        if (data.error) {
            // toast.error("file size is to large. maximum size 10MB.")
            return {
                success: false,
                message: "file size is to large. maximum size 10MB."
            }

            // console.log(data.error.message)
        } else {

            const imageUrl = {
                src: data['secure_url'],
                publicId: data['public_id']
            }
            return {
                imageUrl,
                message: "success",
                success: true
            }
        }
    } catch (error) {
        console.log(error)
        return {
            error,
            success: false
        }
    }
}

export const uploadMultipleImage =  (images: any[], UPLOAD_PRESET: any) => {
   
        

      let uploads =  images.map(async (file: any) => {

            const formData = new FormData()
            formData.append("file", file)
            formData.append("upload_preset", UPLOAD_PRESET)
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                method: "POST",
                body: formData
            })

            const data = await res.json()
            if (data.error)  return {
                    success: false,
                    message: "file size is to large. maximum size 10MB."
                }
            let imageUrl = {
                src: data['secure_url'],
                publicId: data['public_id']
            }
            return imageUrl
            // uploadImages.push(imageUrl)

        })
        return uploads
        // return {
        //         images: uploadImages,
        //         success: true
        // }
    

}