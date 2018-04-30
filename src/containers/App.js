import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

class App extends Component {
	constructor (){
		super()
		this.state = { // state = může se měnit a ovlivnit aplikaci
			robots: [],
			searchfield: ''			
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users/')
			.then(response => response.json())
			.then(users => this.setState({ robots: users }));
	}

	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value })
	}

	render () {
		const {robots, searchfield} = this.state; // mohu následně odstranit this.state v celé fci render ()
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		})

		return !robots.length ? // if no robots here, else
			<h1>Loading</h1> : 
			(
				<div className='tc'>
					<h1 className='f1'>Robo-friends</h1>
					<SearchBox searchChange={this.onSearchChange} />
					<Scroll>
						<CardList robots={filteredRobots} />
					</Scroll>
				</div>
			);	
	}
}

export default App;