import { useState } from "react";
import { useFormik } from "formik"
import * as yup from 'yup'
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

const ModalTimeBlock = ({ isOpen, onClose, onComplete, children }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Reserve seu horário</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        {children}
      </ModalBody>

      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={onComplete}>
          Reservar Horário
        </Button>
        <Button variant="ghost" onClick={onClose}>
          Cancelar
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
)

export const TimeBlock = ({ time }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(prevState => !prevState)

  const { values, handleSubmit, handleChange, handleBlur, errors, touched } = useFormik({
    onSubmit: () => {},
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
    <Button p={8} bg="blue.500" color="white" onClick={toggle}>
      {time}
      <ModalTimeBlock isOpen={isOpen} onClose={toggle} onComplete={handleSubmit}>
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
          />
          <Input 
            label="Telefone: "
            name="phone"
            touched={touched.phone}
            error={errors.phone}
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="(99) 9 9999-9999" 
            size="lg" 
            mt={4}
          />
        </>
      </ModalTimeBlock>
    </Button>
  )
}