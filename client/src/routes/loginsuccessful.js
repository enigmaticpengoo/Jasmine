import { redirect } from "react-router-dom"

const LoginSuccessful = () => {
    const reloadAndRedirect = () => {
        window.location.reload()
        return redirect('/')
    }

    reloadAndRedirect()

  return (
    <></>
  )
}

export default LoginSuccessful