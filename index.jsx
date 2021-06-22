const Square = ({id, takeTurn, toggle}) => {
    const [tik, setTik] = React.useState(2);
    const [filled, setFilled] = React.useState(false);
    const [disable, setDisable] =React.useState(false);

    const marks = ['X','O',''];


    React.useEffect( () => {
        console.log(`Render ${id}`);
        return () => {
            console.log(`Unmount Square: ${id}`)
        }
    });

    return (
        <button 
            className = {tik == 1 ? 'o' : 'x'}
            disabled = {disable}

            onClick={(e) => {
            setTik(takeTurn(id));
            setFilled(true);
            console.log(`I'm square ${id} filled by player ${tik}`)
            setDisable(true);
            e.target.style.background = 'rgb(42, 12, 51)'
        }}>
            <h1>{marks[tik]}</h1>
        </button>
    );
};

const Board = () => {
    const [player, setPlayer] = React.useState(0);
    const [mounted, setMounted] = React.useState(true);
    const [state, setState] = React.useState([]);
    // Starts as an empty array

    let status = `Winner: ${checkWinner(state)}`;
    let turn = `Next up:  ${player == '1' ? 'Player O' : 'Player X'}`;

    const takeTurn = (id) => {
        setState([...state, {id:id, player:player}]);
        setPlayer((player +1) % 2);
        return player;
    };

    function renderSquare (i) {
        return <Square 
                id={i}
                player={player}
                takeTurn={takeTurn}
                ></Square>
    };
    
    function toggle () {
        setMounted(!mounted);
        setState([]);
        setPlayer(0);
    };

    return (
      <div className="game-board">

        <div className = "grid-row">
            {mounted && renderSquare(0)}
            {mounted && renderSquare(1)}
            {mounted && renderSquare(2)}
        </div>

        <div className = "grid-row">
            {mounted && renderSquare(3)}
            {mounted && renderSquare(4)}
            {mounted && renderSquare(5)}
        </div>

        <div className = "grid-row">
            {mounted && renderSquare(6)}
            {mounted && renderSquare(7)}
            {mounted && renderSquare(8)}
        </div>

        <div id="info">
            <h1>{turn}</h1>
            <h1> {status}</h1>
            <button onClick={toggle}> Clear and Reset</button>
        </div>

      </div>
    );
  };
  
const Game = () => {
    return (
        <div>
            <Board></Board>
        </div>
    );
};

const win = [
    // rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // cols
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonal
    [0, 4, 8],
    [2, 4, 6],
];
 
const checkPlayerTurn = (state) => {
    return state.player;
};
  
const checkWinner = (state) => {
    // get array of box id's
    // can't be a winner in less than 5 turns
    if (state.length < 5) return 'No Winner Yet';
    let p0 = state.filter((item) => {
      if (item.player == 0) return item;
    });
    p0 = p0.map((item) => item.id);

    let px = state.filter((item) => {
      if (item.player == 1) return item;
    });
    px = px.map((item) => item.id);

    if (p0 != null && px != null) {
      var win0 = win.filter((item) => {
        return isSuperset(new Set(p0), new Set(item));
      });

      var winX = win.filter((item) => {
        return isSuperset(new Set(px), new Set(item));
      });
    }
    
    if (win0.length > 0) return 'Player X ';
    else if (winX.length > 0) return 'Player O ';
    return 'No Winner Yet';
};

function isSuperset(set, subset) {
    for (let elem of subset) {
      if (!set.has(elem)) {
        return false;
      }
    }
    return true;
}

// ========================================
  
ReactDOM.render(<Game/>, document.getElementById("root"));

