import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useFetch } from '@refetty/react'
import axios from 'axios'

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Button, Container, IconButton, Spinner, SimpleGrid } from "@chakra-ui/react"
import { addDays, format, subDays } from "date-fns"

import { Logo, useAuth, formatDate, TimeBlock } from "../components"

const getSchedule = async ({ when, username }) => axios({
  method: 'get',
  url: 'api/schedule',
  params: { 
    username,
    date: format(when, 'yyyy-MM-dd')
  },
})


const Header = ({ children }) => (
  <Box display="flex" alignItems="center" justifyContent="space-between" p={4}>
    {children}
  </Box>
)


export default function Schedule() {
  const router = useRouter()
  const [auth, { logout }] = useAuth()
  const [when, setWhen] = useState(() => new Date())
  const [data, { loading, status, error }, fetch] = useFetch(getSchedule, { lazy: true })
  

  const addDay = () => setWhen(prevState => addDays(prevState, 1))
  const removeDay = () => setWhen(prevState => subDays(prevState, 1))
 

  useEffect(() => {
    fetch({ when, username: router.query.username })    
  }, [when, router.query.username])
  
  if(error) {
    
  }

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

      <SimpleGrid p={4} columns={2} spacing={4}>
        {loading && <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" 
        color="blue.500" size="xl"/>}
        {data?.map(({ time, isBlocked }) => <TimeBlock key={time} time={time} date={when} disabled={isBlocked} />)}
      </SimpleGrid>
    </Container>
  )
  
}
