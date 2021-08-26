import React, { useState } from 'react'
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
  InputRightElement
} from '@chakra-ui/react'

import { Logo } from '../Logo'
import { firabaseClient, persistenceMode } from '../../config/firebase'

const validationSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório').min(8, 'Requer pelo menos 8 caracteres')
})

export const Login = () => {

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
      firabaseClient.auth().setPersistence(persistenceMode)
      const user = await firabaseClient.auth().signInWithEmailAndPassword(values.email, values.password)
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
        
        <Box p={4}>
          <Button colorScheme="blue" width="100%" onClick={handleSubmit} isLoading={isSubmitting}>Entrar</Button>
        </Box>
      </Box>

      <Box display="flex" flexDir="row">
        <FormLabel>Ainda não possui uma conta?</FormLabel>
        <Link href="/signup">Cadastre-se</Link>
      </Box>
    </Container>
  )
}
