import { Button } from "@chakra-ui/react"
import { useAuth } from "../components"
import { useEffect } from "react"
import { useRouter } from "next/router"

export default function Agenda() {
  const [auth, { logout }] = useAuth()
  const router = useRouter()

  useEffect(() => {
    !auth.user && router.push('/login')
  }, [auth.user])
  
  return (
    <div>
      <Button onClick={logout}>Sair</Button>
    </div>
  )
  
}
