import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useFetch } from '@refetty/react'
import axios from 'axios'

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Button, Container, IconButton, Spinner, Text } from "@chakra-ui/react"
import { Logo, useAuth, formatDate } from "../components"
import { addDays, subDays, format } from "date-fns"
import { getToken } from "../config/firebase/client"

const getAgenda = async (when) => {
  const token = await getToken()

  return axios({
    method: 'get',
    url: 'api/agenda',
    params: { date: format(when, 'yyyy-MM-dd') },
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}


const Header = ({ children }) => (
  <Box display="flex" alignItems="center" justifyContent="space-between" p={4}>
    {children}
  </Box>
)

const AgendaBlock = ({ time, name, phone, ...props }) => (
  <Box {...props} display="flex" bg="gray.100" borderRadius={8} p={4} alignItems="center">
    <Box flex={1}>{time}</Box>
    <Box textAlign="right">
      <Text fontSize="2xl">{name}</Text>
      <Text >{phone}</Text>
    </Box>
  </Box>
)

export default function Agenda() {
  const router = useRouter()
  const [auth, { logout }] = useAuth()
  const [when, setWhen] = useState(() => new Date())
  const [data, { loading, status, error }, fetch] = useFetch(getAgenda, { lazy: true })

  const addDay = () => setWhen(prevState => addDays(prevState, 1))
  const removeDay = () => setWhen(prevState => subDays(prevState, 1))
  
  useEffect(() => {
    !auth.user && router.push('/')
  }, [auth.user])

  useEffect(() => {
    fetch(when)
    
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

      {loading && <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl"/>}
    
      {data?.map(doc => (
        <AgendaBlock key={doc.time} time={doc.time} name={doc.name} phone={doc.phone} mt={4} />
      ))}
    </Container>
  )
  
}
