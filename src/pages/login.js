import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router'


export default function AuthenticationTitle() {

  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const loginHandler = async () => {
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem('token', data.token)
        router.push('/')
      }
    })  
  }
  return (
    <Container size={800} my={80} >
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Salesine | Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button">
          <Link href='/register'>
             Create account
          </Link>
          
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput 
          label="Email" 
          name="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="you@mantine.dev" 
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
        <Group position="apart" mt="lg">
 
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" size="lg" onClick={loginHandler}>
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}