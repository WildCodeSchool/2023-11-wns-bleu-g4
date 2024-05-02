import LoginForm from "@/features/auth/login/LoginForm"
import { Container, Image } from '@chakra-ui/react'
import Layout from "@/layouts/Layout"
export default function Login() {

    const urlBg: string = "url('https://images.unsplash.com/photo-1565945985123-4c67ab31eb8d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' )"

    return (
        <Layout>
            <Container
                bgImage={{md : urlBg}}
                centerContent
                backgroundPosition="center"
                objectFit='contain'
                backgroundRepeat="no-repeat"
                w='w-screen'
                position="relative"
                py="100px"
                maxW='1440'
                maxH='720'
                borderRadius='1.5rem'
            >
                <LoginForm />
            </Container>
        </Layout>
    )
};
