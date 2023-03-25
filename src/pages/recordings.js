import { Divider, Card, Button, Group, Badge } from '@mantine/core';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Recordings(props) {
  const router = useRouter()
  if (typeof window !== 'undefined') {
    if(localStorage.getItem('token') === null) {
      router.push('/login');
    }
  }
  const [btn, setBtn] = useState('Transcript');
  const toggleHandler = () => {
    if (btn === 'Recording') {
      setBtn('Transcript');
    } else {
      setBtn('Recording');
    } 
  }

  const {
    query: { topic, id, video, trans, rec },
  } = router
  console.log(rec)
  const set = "/Recordings/" + video
  return (
    <>
     
    </>
  );
}