import React, { Children, useState } from 'react'
import Link from 'next/link'
import { useFormik } from 'formik'
import * as yup from 'yup'

import {
  Container,
  Box,
  Input,
  Button,
  Text,
  FormControl,
  FormLabel,
  FormHelperText,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  CheckIcon
} from '@chakra-ui/react'

import { Logo } from '../components'
<<<<<<< HEAD
import { firebaseClient } from '../config/firebase/client'
=======
import { firabaseClient } from '../config/firebase/client'
>>>>>>> 33e4f77fbfd37d80e4ab0ceec809a87dd414f043

const validationSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório').min(8, 'Requer pelo menos 8 caracteres'),
  username: yup.string().required('Campo obrigatório')
})

function Home() {

  const [ show, setShow ] = useState(false)

  const { 
    values, 
    errors, 
    touched, 
    handleBlur, 
    handleChange, 
    handleSubmit,
    isSubmitting
  } = useFormik({
    onSubmit: async (values, form) => {
      const user = await firebaseClient.auth().createUserWithEmailAndPassword(values.email, values.password)
      console.log(user)
    },
    validationSchema,
    initialValues: {
      email: '',
      password: '',
      username: ''
    }
  })

  const handleClick = () => setShow(!show)

  return (
    <Container p={4} centerContent>
      <Logo />
      <Box p={4} mt={8}>
        <Text>Crie sua agenda compartilhada</Text>
      </Box>

      <Box>
        <FormControl id="email" p={4} isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={values.email} onChange={handleChange} onBlur={handleBlur}/>       
            { touched.email && <FormHelperText textColor="#e74c3c">{errors.email}</FormHelperText> }
        </FormControl>

        <FormControl id="password" p={4} isRequired>
          <FormLabel>Senha</FormLabel>
          <InputGroup size="lg">
            <Input 
              pr="4.5rem"
              type={ show ? "text" : "password" }
              value={values.password} 
              onChange={handleChange} 
              onBlur={handleBlur}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                { show ? "Hide" : "Show" }
              </Button>
            </InputRightElement>
          </InputGroup>
          { touched.password && <FormHelperText textColor="#e74c3c">{errors.password}</FormHelperText> }
        </FormControl>
        
        <FormControl id="username" p={4} isRequired>
          <InputGroup size="lg">
            <InputLeftAddon>clocker.work/</InputLeftAddon>
            <Input type="username" value={values.username} onChange={handleChange} onBlur={handleBlur}/>       
          </InputGroup>
          { touched.username && <FormHelperText textColor="#e74c3c">{errors.username}</FormHelperText> }
        </FormControl>

        <Box p={4}>
          <Button colorScheme="blue" width="100%" onClick={handleSubmit} isLoading={isSubmitting}>Entrar</Button>
        </Box>
      </Box>

      <Box display="flex" flexDir="row">
        <FormLabel>Já possui uma conta?</FormLabel>
        <Link href="/">Acesse</Link>
      </Box>

    </Container>
  )
}

export default Home