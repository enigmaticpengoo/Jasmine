import { useState } from "react"
import { Form, redirect } from "react-router-dom"

const Uploadphoto = ({ imageType, userId }) => {

    const [selectedImage, setSelectedImage] = useState(false)

    return (
    <div className='uploadphoto-container'>
      <Form className='uploadphoto-box' method='post' action={`/uploadphoto/${imageType}/${userId}`} encType='multipart/form-data'>
          {selectedImage && <img className="preview-profilepic uploadphoto-item" src={URL.createObjectURL(selectedImage)} />}
          <input className='uploadphoto-item' accept='.jpg, .png' type='file' name='profilepic' onChange={(e) => setSelectedImage(e.target.files[0])}></input>
          <button className='button form-button uploadphoto-item' type='submit'>Upload</button>
      </Form>
    </div>
  )
}

export default Uploadphoto

export const uploadPhotoAction = async ({ params, request }) => {
    const data = await request.formData()

    async function uploadPhoto(data, params) {
        const result = await fetch('http://127.0.0.1:3001/user/uploadphoto/' + params.phototype + '/' + params.id, {
          method: "POST",
          body: data
        })

        return result
    }

    await uploadPhoto(data, params)

    return redirect(`/${params.id}`)
}