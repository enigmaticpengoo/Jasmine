import { Form, useOutletContext, useParams } from "react-router-dom"

const Uploadphoto = () => {
    const [[loggedIn, setLoggedIn], [loginPopup, setLoginPopup]] = useOutletContext()
  
    return (
    <Form method='post' action={`/signup/uploadphoto/${window.location.pathname.split('/')[3]}`} encType='multipart/form-data'>
        <input type='file' name='profilepic'></input>
        <button className='button form-button' type='submit'>Upload</button>
    </Form>
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

    return result
}