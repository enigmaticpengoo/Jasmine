import { Form } from "react-router-dom"

const Uploadphoto = () => {
  return (
    <Form method='post' action='/signup/uploadphoto' encType='multipart/form-data'>
        <input type='file' name='profilepic'></input>
        <button className='button form-button' type='submit'>Upload</button>
    </Form>
  )
}

export default Uploadphoto

export const uploadPhotoAction = async ({ request }) => {
    const data = await request.formData()
    
    console.log(data.get('profilepic'))

    const submission = {
        profilepic: data.get('profilepic')
    }

    async function uploadPhoto(data) {
        const result = await fetch('http://127.0.0.1:3001/user/uploadphoto', {
          method: "POST",
          body: data
        })

        return result
    }

    const result = await uploadPhoto(data)

    return result
}