import React from 'react'
import ReactTags from 'react-tag-autocomplete'
import './css/searchbar.css';
import axios from 'axios';


//https://www.npmjs.com/package/react-tag-autocomplete
class SearchText extends React.Component {
  constructor () {
    super()
    this.sendData = this.sendData.bind(this)
    this.state = {
      tags: [     
      ],
      suggestions: [
       
      ]
    }
  


    axios.get('/tweet/getTags')
        .then((response) => {
          var i = 0
          var j = 0
          var k =0
          const data = response.data
          var temp =data[0].tag_me[0].split(" : ")
          var tempSuggestion = []
          while(i<data.length){
            j=0
            while(j<data[i].tag_me.length){
              temp=data[i].tag_me[j].split(" : ")
              
              tempSuggestion[k] = {
                id:temp[1],
                name: temp[0]
              }
              k++
              j++
            }

              i++
          }
          
          
          //this.state.suggestions = tempSuggestion
          this.setState({suggestions: tempSuggestion})
         
           
      })
      .catch((error) => {
          console.log('error: ', error)
      });
    
      

    this.reactTags = React.createRef()
  }

  

  sendData = (tags) =>{
    this.props.parentCallback(tags);
  }

  onDelete (i) {
    const tags = this.state.tags.slice(0)
    tags.splice(i, 1)
    this.setState({ tags })
    this.sendData(tags)
  }

  onAddition (tag) {
    const tags = [].concat(this.state.tags, tag)
    this.setState({ tags })
    this.sendData(tags)
  }

  render () {
    return (
     
      <ReactTags
        placeholderText="Add new Text"
        ref={this.reactTags}
        tags={this.state.tags}
        suggestions={this.state.suggestions}
        onDelete={this.onDelete.bind(this)}
        onAddition={this.onAddition.bind(this)} 
        classNames="search"
        />
     

    )
  }
}


export default SearchText