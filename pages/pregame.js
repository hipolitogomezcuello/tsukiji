import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { render } from "react-dom";

const Pregame = () => {
  const [socket, setSocket] = useState();
  const [router, setRouter] = useState(useRouter());
  const [users, setUsers] = useState([]);
  const usersRef = useRef(users);
  usersRef.current = users;

  useEffect(() => {
    const socket = io('http://localhost:5500');
    setSocket(socket);
    setupSockets(socket);
    getUsers(socket);
  }, []);

  const setupSockets = (socket) => {
    socket.on('get-users', data => {
      setUsers(data);
    });

    socket.on('user-joined-lobby', data => {
      const currentLobby = getCurrentLobby();
      if (data.lobby.id === currentLobby.id) {
        setUsers([...usersRef.current, data.user]);
      }
    })

    socket.on('user-left-lobby', data => {
      const currentLobby = getCurrentLobby();
      if (data.lobby.id === currentLobby.id) {
        const newUsers = usersRef.current.filter(currentUser => currentUser.id !== data.user.id);
        setUsers(newUsers);
      }
    });

    socket.on('start-game', data => {
      const currentLobby = getCurrentLobby();
      if (data.lobby.id === currentLobby.id) {
        localStorage.setItem('players', JSON.stringify(usersRef.current));
        socket.disconnect();
        router.push('/game');
      }
    });

    socket.on('delete-lobby', lobby => {
      const currentLobby = getCurrentLobby();
      if (lobby.id === currentLobby.id) {
        localStorage.removeItem('currentLobby');
        socket.disconnect();
        router.push('/lobbies');
      }
    })
  }

  const getUsers = (socket) => {
    socket.emit('get-users', getCurrentLobby());
  }

  const leaveLobby = () => {
    socket.emit('leave-lobby', {
      lobby: getCurrentLobby(),
      user: getCurrentUser(),
    });
    router.push('/lobbies');
  }

  const startGame = () => {
    socket.emit('start-game', getCurrentLobby());
  }
  const deleteLobby = () => {
    socket.emit('delete-lobby', getCurrentLobby());
  }

  const getCurrentLobby = () => {
    return JSON.parse(localStorage.getItem('currentLobby'));
  }

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
  }

  return(
    <Container>
      <Row>
        <Col>
          <Button onClick={leaveLobby}>Leave</Button>
        </Col>
        <Col>
          <Button onClick={startGame}>Start Game</Button>
        </Col>
        <Col>
          <Button onClick={deleteLobby}>Delete Lobby</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>Username</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { users.length > 0 && users.map(user => 
                <tr>
                  <td>{user.username}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Pregame;