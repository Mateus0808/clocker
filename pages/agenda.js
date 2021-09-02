import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useFetch } from '@refetty/react'
import axios from 'axios'

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Button, Container, IconButton } from "@chakra-ui/react"
import { Logo, useAuth, formatDate } from "../components"
import { addDays, subDays } from "date-fns"

const getAgenda = (when) => axios({
  method: 'get',
  url: 'api/agenda',
  params: { when },
  // headers: {
  //   Authorization: `Bearer ${token}`
  // }
})


const Header = ({ children }) => (
  <Box display="flex" alignItems="center" justifyContent="space-between" p={4}>
    {children}
  </Box>
)

export default function Agenda() {
  const router = useRouter()
  const [auth, { logout }] = useAuth()
  const [when, setWhen] = useState(() => new Date())
  const [data, { loading, status, error }, fetch] = useFetch(getAgenda, { lazy: true })
  
  const addDay = () => setWhen(prevState => addDays(prevState, 1))
  const removeDay = () => setWhen(prevState => subDays(prevState, 1))
  console.log('--------', when)
  useEffect(() => {
    !auth.user && router.push('/')
  }, [auth.user])

  useEffect(() => {
    fetch(when)
    console.log('----------', when)
  }, [when])
  
  return (
    <Container>
      <Header>
        <Logo size={220}/>
        <Button onClick={logout}>Sair</Button>
      </Header>

      <Box mt={8} display="flex" alignItems="center">
        <IconButton icon={<ChevronLeftIcon />} bg="transparent" onClick={removeDay}/>
        <Box flex={1} textAlign="center">{formatDate(when, 'PPPP')}</Box>
        <IconButton icon={<ChevronRightIcon />} bg="transparent" onClick={addDay}/>
      </Box>
    </Container>
  )
  
}
