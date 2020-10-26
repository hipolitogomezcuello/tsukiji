const { useRouter } = require("next/router");
const { useState, useEffect, useRef } = require("react");
const { Container, Row, Col, Button, Card } = require("react-bootstrap")

const Game = () => {
  const [socket, setSocket] = useState();
  const [router, setRouter] = useState(useRouter());
  const [batches, setBatches] = useState([]);
  const [phase, setPhase] = useState('setup');
  const [players, setPlayers] = useState([]);


  useEffect(() => {
    const socket = io('http://localhost:5500');
    setSocket(socket);
    setupSockets(socket);
    socket.emit('ready-to-start', {
      user: getCurrentUser(),
      lobby: getCurrentLobby(),
    });
  }, []);

  const setupSockets = (socket) => {
    socket.on('end-game', data => {
      router.push('/pregame');
    });

    socket.on('game-start', game => {
      setBatches(game.batches);
      setPhase(game.phase);
      setPlayers(game.players);
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
        <Col xs={3}>
          tickets
        </Col>
        <Col xs={6}>
          <Row>
            { batches && batches.map((batch, i) => <Col key={i}>
              <Card>
                <Card.Body>
                  {batch.map((ingredient, j) => <Card.Text key={j}>
                    {ingredient.name}
                  </Card.Text>)}
                </Card.Body>
              </Card>
            </Col>)}
          </Row>
        </Col>
        <Col xs={3}>
          players
        </Col>
      </Row>
    </Container>
  )
}

export default Game;