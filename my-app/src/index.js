import React from 'react';
import ReactDOM from 'react-dom';
import {  Button, View, Alert } from 'react-native';

import './index.css';


function Square (props) {
	
    return (
      
<Button color={props.color}
				onPress={props.onClick} title={props.value}>
        
      </Button>
    );
 
}

class Board extends React.Component {
	
	
  renderSquare(i) {
    return (
	<ul className="square">
<Square value={this.props.squares[i]} color={this.props.colorOfSquare[i]}
				   onClick={()=> this.props.onClick(i)}/>
		</ul>);

  }

 createTable() {
    let table = []

    // Outer loop to create parent
    for (let i = 0; i < 3; i++) {
      let children = []
      //Inner loop to create children
      for (let j = 0; j < 3; j++) {
        children.push(this.renderSquare(i*3+j));
      }
      //Create the parent and add the children
      table.push(<div className="board-row">{children}</div>)
    }
    return table
  }

  render() {
	
    return (
      

 
<div>
	{this.createTable()}

</div>
    );
  }


}



class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state= { history : [ {	squares: Array(9).fill(null),
									pointx: null,
									pointy: null,
									colorOfSquare :  Array(9).fill('#eeeeee')}],
		xIsNext:true,
		stepNumber : 0,
		moves: [],
		};
	}
	
	handleClick(i) {
	const history = this.state.history.slice(0, this.state.stepNumber+1);
	const current = history[this.state.stepNumber];
	const squares = current.squares.slice();
	const colors = current.colorOfSquare.slice();
	if(calculateWinner(squares) || squares[i]) {return;}
	squares[i] = this.state.xIsNext?  "X" : "O";
	
	const active = { fontWeight : 'bold'};
	const inactive = {fontWeight : 'normal'};
	const moves = history.map((step, move)=> {
		const desc = move ? "Go to move #"+ move + " (" + step.pointx + "," +step.pointy + ")": "Go to game start";
		return (
			
<li key={move}>
	<a href='#' style = {this.state.stepNumber===move ? active: inactive}  onClick={()=>this.jumpTo(move,desc)}>{desc}</a>
</li>
		) ;
	});
	
	this.setState({	history: history.concat( [{squares : squares, 
					pointx :  i%3 +1,
					pointy :  Math.floor(i/3) + 1,
					colorOfSquare : colors}
					]), 
					xIsNext : !this.state.xIsNext,
					stepNumber : history.length,
					moves : moves,
					});
}

	handleToggle () {
		this.setState ( {moves: this.state.moves.reverse()});
	}
	
   jumpTo(step, desc) {
	this.setState({
		stepNumber : step,
		xIsNext : (step % 2 === 0),
	});
	
};

  render() {
	const history = this.state.history;
	const current = history[this.state.stepNumber];
	const winner = calculateWinner(current.squares);
	
	let status;
	if(winner) {
		status = "Winner is " + winner[0];
			const winnerSquares=winner.slice(1,4);
	
	current.colorOfSquare[winnerSquares[0]]='#00ff00';
	current.colorOfSquare[winnerSquares[1]]='#00ff00';
	current.colorOfSquare[winnerSquares[2]]='#00ff00';
	} else if (this.state.stepNumber == 9) {
		 status= "No Winner" 
	} else {
        status= "Next player: " + (this.state.xIsNext ? "X" : "0");}


	
    return (
      
<div className="game">
	<div className="game-board">
		<Board squares={current.squares} colorOfSquare={current.colorOfSquare}
				  onClick={(i)=>this.handleClick(i)}/>
	</div>
	<div className="game-info">
		<div>{status}</div>
		<ol>{this.state.moves}</ol>
		<button onClick = {()=>this.handleToggle()}>Toggle</button>
	</div>
</div>
    );
  }
}

// ========================================

ReactDOM.render(
  
<Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a],a,b,c];
    }
  }
  return null;
};


