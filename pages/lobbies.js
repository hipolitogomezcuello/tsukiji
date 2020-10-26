import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";

const Lobbies = () => {
  const [socket, setSocket] = useState();
  const [router, setRouter] = useState(useRouter());
  const [lobbies, setLobbies] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:5500');
    setSocket(socket);
    setupSockets(socket);
    getLobbies(socket);
  }, [])

  const setupSockets = (socket) => {

    socket.on('get-lobbies', data => {
      setLobbies(data);
    });

    socket.on('join-lobby', data => {
      localStorage.setItem('currentLobby', JSON.stringify(data));
      socket.disconnect();
      router.push('/pregame');
    });

    socket.on('create-lobby', lobby => {
      localStorage.setItem('currentLobby', JSON.stringify(lobby));
      socket.disconnect();
      router.push('/pregame');
    })
  }
  const getLobbies = (socket) => {
    socket.emit('get-lobbies');
  }

  const joinLobby = (lobby) => {
    const myUser = JSON.parse(localStorage.getItem('user'));
    socket.emit('join-lobby', {
      user: myUser,
      lobby,
    });
  }

  const createLobby = () => {
    const newLobbyName = prompt('New lobby\'s name:');
    const user = JSON.parse(localStorage.getItem('user'));
    socket.emit('create-lobby', {
      name: newLobbyName,
      user,
    });
  }

  return(
    <Container>
      <Row>
        <Col>
          <h1>Lobbies</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={createLobby}>Create Lobby</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { lobbies.length > 0 && lobbies.map((lobby, i) => 
                <tr key={i}>
                  <td>{ lobby.name }</td>
                  <td>
                    <Button onClick={() => joinLobby(lobby)}>Join</Button>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}

export default Lobbies;
