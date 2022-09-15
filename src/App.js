import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component, Fragment } from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import rockImg from './assets/rock.png';
import paperImg from './assets/paper.png';
import scissorsImg from './assets/scissors.png';
import pointOne from './assets/point.jpg';
import pointTwo from './assets/point2.jpg';
import rps from './assets/rps.gif';

const WhoIsBig = (First, Second) => {
  if (First === Second) {
    return 'Tie';
  }
  switch (First) {
    case "Rock":
      if (Second === "Scissors") { 
        return First;
      } else {
        return Second;
      }
    case "Paper":
      if (Second === "Rock") { 
        return First;
      } else {
        return Second;
      }
    case "Scissors":
      if (Second === "Paper") { 
        return First;
      } else {
        return Second;
      }
    default:
      break;
  }
};

class App extends Component {
  state = {
    Started: false,
    Player: null,
    Computer: null,
  };

  render() {
    const { Started, Player, Computer } = this.state;
    // handlePlayerClick = () => {};
    const Images = {
      Rock: rockImg,
      Paper: paperImg,
      Scissors: scissorsImg
    };
    return (
      <Fragment>
        <Container className='mt-5 Game'>
          <Row>
            <Col>
              <div>
                <h1 className='title'>Dwayne the Rock Paper Scissors</h1>
              </div>
              { Started ? 
                ( <div className='Game text-center'>
                    <div className={"Player" + (Player ? " selected " : "")}>
                      <p>Player</p>
                      {Player ? (
                        <img className='rolling-img' src={Images[Player]} alt={Player} />
                      ) : (
                      <div className='choose'>
                        <Row>
                          {Object.keys(Images).map((a) => 
                          <Col lg={4} md={4} sm={4}>
                            <span 
                              key={a} 
                              onClick={() => {
                                this.setState({
                                  Player: a,
                                  Computer: Object.keys(Images)[
                                    Math.floor(
                                      Math.random() * Object.keys(Images).length
                                    )
                                  ]
                                });
                            }} >
                              <img src={Images[a]} alt={a} />
                            </span>
                          </Col>
                          )}
                        </Row>
                      </div>    
                      )}
                    </div>  {/* Player container end */}
                    <div className='Computer text-center'>
                      <p>Computer</p>
                      { Computer ? (
                        <img className='rolling-img' src={Images[Computer]} alt={Computer} />
                      ) : (
                        <img className='rolling-img' src={rps} />
                      )}
                      
                      
                      
                    </div>
                </div>
              ) : <Image
              className='start'
              src='https://i.gifer.com/4Civ.gif'
              alt='start'  
              onClick={() => {
                this.setState({
                  Started: true
                });
              }}
            /> }
            {Player && Computer && (
              <p className='Results'>
                {WhoIsBig(Player, Computer) !== "Tie"} Wins!
                { (() => {
                  const Winner = WhoIsBig(Player, Computer);
                  if (Winner === "Tie") {
                    return 'Nobody Wins...'
                  } else {
                    if (Winner === Player) {
                      return "Player Wins!";
                    } else {
                      return "Computer Wins!";
                    }
                  }
                }) }
                <img src={pointOne} alt="Restart" onClick={() => {
                  this.setState({
                    Started: false,
                    Player: null,
                    Computer: null,
                  })
                }} />
              </p>
            )}
            
            <pre>{JSON.stringify(this.state, null, 2)}</pre>
            </Col>
          </Row>
        </Container>
      
      </Fragment>
      
    );
  }
}

export default App;