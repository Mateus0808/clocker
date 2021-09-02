import { Input as InputBase } from "@chakra-ui/input";
import { Box, FormControl, FormLabel, FormHelperText } from '@chakra-ui/react'

export const Input = ({ error, label, touched, ...props}) => (
  <Box>
    <FormControl id={props.name} p={4} isRequired>
      <FormLabel>{label}</FormLabel>
      <InputBase {...props}/>
      { touched && <FormHelperText textColor="#e74c3c">{error}</FormHelperText> }
    </FormControl>
  </Box>
)