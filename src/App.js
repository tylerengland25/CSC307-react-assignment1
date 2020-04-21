import React, { Component } from 'react'
import axios from 'axios'
import Table from './Table'
import Form from './Form'

class App extends Component {
   state = {
      characters: []
   }
   
   removeCharacter = index => {
      const { characters } = this.state

      axios.delete("http://localhost:5000/users/".concat(characters[index].id))

      this.setState({
         characters: characters.filter((character, i) => {
            return i !== index
         }),
      })
   }

   handleSubmit = character => {
      this.makePostCall(character).then( call => {
	 if (call.status === 201) {
		 this.setState({ characters: [...this.state.characters, call.data] })
	 }
      })
   }

   render() {
      const { characters } = this.state

      return (
        <div className="container">
          <Table characterData={characters} removeCharacter={this.removeCharacter} />
          <Form handleSubmit={this.handleSubmit} />
        </div>
      )
   }


   makePostCall(character){
      return axios.post('http://localhost:5000/users', character)
       .then(function (response) {
         console.log(response)
         return (response)
       })
       .catch(function (error) {
         console.log(error)
         return false
       })
   }


   componentDidMount() {
      axios.get('http://localhost:5000/users')
       .then(res => {
         const characters = res.data.users_list
         this.setState({ characters })
       })
       .catch(function (error) {
         //Not handling the error. Just logging into the console.
         console.log(error)
       })
   }
}

export default App
