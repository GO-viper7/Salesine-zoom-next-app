import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router'

export default function AuthenticationTitle() {

  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const registerHandler = async () => {
    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
     
        router.push('/login')
 
    })  
  }
  return (
    <Container size={800} my={80} >
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Salesine | Create account
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account?{' '}
        <Anchor size="sm" component="button">
          <Link href='/login'>
             Login
          </Link>
          
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput 
          label="Email" 
          name="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Test@gmail.com" 
          size="lg"
          required 
        />
        <PasswordInput 
          label="Password" 
          value={password}
          name="password" 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Your password" 
          size="lg"
          required mt="md" 
        />
       
        <Button fullWidth mt="xl" size="lg" onClick={registerHandler}>
          Sign up
        </Button>
      </Paper>
    </Container>
  );
}