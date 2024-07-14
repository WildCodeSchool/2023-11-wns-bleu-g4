import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Box,
  Text,
  Textarea
} from '@chakra-ui/react'
import React from 'react'
import { ProductModalProps } from '../../types'

export default function UserMInfoModal({ isOpen, onClose, user }: ProductModalProps) {

  return (
      <Modal isOpen={isOpen} onClose={onClose} variant="darkOverlayStyle" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update informations</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Flex justifyContent="space-between" gap={2} mb={4}>
                <Box>
                  <FormLabel mb={1} id="name">
                    Name
                  </FormLabel>
                  <Input type="text" placeholder="Name" defaultValue={user?.name}/>
                </Box>
                <Box>
                  <FormLabel mb={1} id="firstname">
                    Firstname
                  </FormLabel>
                  <Input type="text" placeholder="Firstname" defaultValue={user?.firstname}/>
                </Box>
              </Flex>
              <Box mb={4}>
                <Text mb={1}>Address</Text>
                <Textarea placeholder="Address" maxHeight={200} defaultValue={user?.address}/>
              </Box>
              <Flex justifyContent="space-between" gap={2} mb={4}>
                <Box>
                  <FormLabel mb={1} id="postcode">
                    PostCode
                  </FormLabel>
                  <Input type="text" placeholder="PostCode" defaultValue={user?.postcode} />
                </Box>
                <Box>
                  <FormLabel mb={1} id="city">
                    City
                  </FormLabel>
                  <Input type="text" placeholder="City" defaultValue={user?.city}/>
                </Box>
                <Box>
                  <FormLabel mb={1} id="country">
                    Country
                  </FormLabel>
                  <Input type="text" placeholder="Country" defaultValue={user?.country}/>
                </Box>
              </Flex>

              <Flex justifyContent="space-between" gap={2} mb={4}>
                <Box>
                  <FormLabel mb={1} id="phone">
                    Phone
                  </FormLabel>
                  <Input type="tel" placeholder="Phone number" defaultValue={user?.phone}/>
                </Box>
                <Box>
                  <FormLabel mb={1} id="email">
                    Email
                  </FormLabel>
                  <Input type="email" placeholder="Email" defaultValue={user?.email}/>
                </Box>
              </Flex>

              <FormLabel mb={1} id="countInStock">
                Avatar
              </FormLabel>
              <input type="file" defaultValue={user?.avatar}/>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
            <Button colorScheme="blue" ml={3} type="submit">
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}