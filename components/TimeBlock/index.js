import { useState } from "react";
import { useFormik } from "formik"
import * as yup from 'yup'
import axios from 'axios'
import { 
  Modal, 
  ModalCloseButton, 
  ModalContent, 
  ModalHeader, 
  ModalOverlay,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

import { Input } from "../Input"; 
import { format } from "date-fns";

const setSchedule = async ({ date, ...data }) => axios({
  method: 'post',
  url: 'api/schedule',
  data: { 
    ...data,
    date: format(date, 'yyyy-MM-dd'),
    username: window.location.pathname.replace('/', '')
  },
})


const ModalTimeBlock = ({ isOpen, onClose, onComplete, isSubmitting, children }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Reserve seu horário</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        {children}
      </ModalBody>

      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={onComplete} isLoading={isSubmitting}>
          Reservar Horário
        </Button>
        {!isSubmitting && <Button variant="ghost" onClick={onClose}>Cancelar</Button>}
      </ModalFooter>
    </ModalContent>
  </Modal>
)

export const TimeBlock = ({ time, date, disabled, onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(prevState => !prevState)

  const { values, handleSubmit, handleChange, handleBlur, errors, touched, isSubmitting } = useFormik({
    onSubmit: async (values) => {
      try{
        await setSchedule({ ...values, time, date })
        toggle()
        onSuccess()
      } catch(erro) {
        console.log(error)
      }
    },
    initialValues: {
      name: '',
      phone: ''
    },
    validationSchema: yup.object().shape({
      name: yup.string().required('Campo obrigatório'),
      phone: yup.string().required('Campo obrigatório')
    })
  })

  return (
    <Button p={8} bg="blue.500" color="white" onClick={toggle} disabled={disabled}>
      {time}
      {!disabled && <ModalTimeBlock 
        isOpen={isOpen} 
        onClose={toggle} 
        onComplete={handleSubmit} 
        isSubmitting={isSubmitting}
      >
        <>
          <Input 
            label="Nome: "
            name="name"
            error={errors.name}
            touched={touched.name}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Digite seu nome" 
            size="lg"
            disabled={isSubmitting}
          />

          <Input 
            label="Telefone: "
            name="phone"
            mask={['(99) 9999-9999', '(99) 9 9999-9999']}
            touched={touched.phone}
            error={errors.phone}
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            placeholder="(99) 9 9999-9999" 
            size="lg" 
            mt={4}
          />
        </>
      </ModalTimeBlock>}
    </Button>
  )
}