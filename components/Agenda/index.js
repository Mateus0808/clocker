import { Button } from "@chakra-ui/react"
import { firabaseClient } from '../../config/firebase'

export const Agenda = () => {
  const logout = () => firabaseClient.auth().signOut()

  return (
    <div>
      <Button onClick={logout}>Sair</Button>
    </div>
  )
}
