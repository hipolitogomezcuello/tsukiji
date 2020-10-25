const { useRouter } = require("next/router");
const { useState, useEffect } = require("react");
const { Container, Row, Col, Button } = require("react-bootstrap")

const Game = () => {
  const [socket, setSocket] = useState();
  const [router, setRouter] = useState(useRouter());

  useEffect(() => {
    const socket = io('http://localhost:5500');
    setSocket(socket);
    setupSockets(socket);
  }, []);

  const setupSockets = (socket) => {
    socket.on('end-game', data => {
      router.push('/pregame');
    })
  }

  const endGame = () => {
    socket.emit('end-game', getCurrentLobby());
  }

  const getCurrentLobby = () => {
    return JSON.parse(localStorage.getItem('currentLobby'));
  }

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
  }

  return (
    <Container>
      <Row>
        <Col>
          <Button onClick={endGame}>End game</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          hoho
        </Col>
      </Row>
    </Container>
  )
}

export default Game;