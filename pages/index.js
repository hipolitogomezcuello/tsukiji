import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
const io = require('socket.io-client');

export default function Home() {
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState('');
  const [router, setRouter] = useState(useRouter());

  useEffect(() => {
    const currentSocket = io('http://localhost:5500');
    setSocket(currentSocket);
    
    currentSocket.on('new-user', newUser => {
      localStorage.setItem('user', JSON.stringify(newUser));
      currentSocket.disconnect();
      router.push('/lobbies');
    });
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
    socket.emit('new-user', { username });
  }

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Enter a Nickname</Form.Label>
              <Form.Control type="text" placeholder="nickname" onChange={event => setUsername(event.target.value)}/>
            </Form.Group>
            <Button type="submit">Login</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
