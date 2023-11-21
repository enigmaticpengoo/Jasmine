import { useState } from "react"
import { Form, redirect, useOutletContext } from "react-router-dom"

const Uploadphoto = () => {
    const [[loggedIn, setLoggedIn], [loginPopup, setLoginPopup]] = useOutletContext()

    const [selectedImage, setSelectedImage] = useState(false)

    return (
    <div className='uploadphoto-container'>
      <Form className='uploadphoto-box' method='post' action={`/signup/uploadphoto/${window.location.pathname.split('/')[3]}`} encType='multipart/form-data'>
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
        const result = await fetch('http://127.0.0.1:3001/user/uploadphoto/' + params.id, {
          method: "POST",
          body: data
        })

        return result
    }

    const result = await uploadPhoto(data, params)

    return redirect('/login')
}