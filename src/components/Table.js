import React, {Component} from 'react';
import { Table, Input, Icon, Button } from 'semantic-ui-react';
import axios from 'axios';
import Modal from './Modal';

class TableTest extends Component {
  state = {
    data: [],
    modalOpen: false,
    isSearch: false,
    content: "",
    inputValue: "",
    filterRows: [],
    rows:[],
  }


  componentDidMount() {
      const request = () => { axios.get('https://hn.algolia.com/api/v1/search_by_date?tags=story')
      .then((response)=>{
        const data = response.data.hits
          this.setState({data})
      if (this.state.isSearch === false) {
        this.setState({rows:data})
      }
      })
      }
      setInterval(request, 10000);

  }

  clearSearch = (event) => {
    this.setState({isSearch: false})
    this.setState({rows:this.state.data})
  }

  inputChange = (event) => {
    this.setState({inputValue: event.target.value})
  }

  search = (event) => {
    this.setState({isSearch: true})
    if(event.keyCode === 13){
      const titles =  this.state.data.map((row)=> {
          return row.title
        } )

      const filterTitles = []

      titles.map((title) =>{
        if(title.includes(this.state.inputValue)) {
          filterTitles.push(title)
        }
      })

      const filterRows = [];
      this.state.data.forEach((row) => {
        filterTitles.forEach( (filterTitle) => {
          if (row.title === filterTitle ) {
            filterRows.push(row);
          }
        })
      })
      this.setState({rows: filterRows})
    }
  }

  handleClick = (row) => {
    const content = JSON.stringify(row)
    this.setState({ modalOpen: true , content})

  }

  handleClose = () => this.setState({ modalOpen: false })

  render() {
    const { modalOpen, content, inputValue, rows } = this.state

    return (
      <div>
        <Input icon placeholder='Search for title ...'>
          <input
            value={inputValue}
            onChange={(event) => this.inputChange(event)}
            onKeyDown={(event) => this.search(event)}
          />
        <Icon name='search' />
        </Input>
        <Button onClick={(event) => this.clearSearch(event)}>clear search</Button>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Url</Table.HeaderCell>
              <Table.HeaderCell>Created_at</Table.HeaderCell>
              <Table.HeaderCell>Autor</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              rows.map( (row) => {
                return(
                  <Table.Row key={row.title} onClick={() => this.handleClick(row)}>
                    <Table.Cell>{row.title}</Table.Cell>
                    <Table.Cell>{row.url}</Table.Cell>
                    <Table.Cell>{row.created_at}</Table.Cell>
                    <Table.Cell>{row.author}</Table.Cell>
                  </Table.Row>
                )
              })
            }
          </Table.Body>
        </Table>
      <Modal content={content} modalOpenProp={modalOpen} modalCloseProp={this.handleClose}/>
      </div>
    );
  }
}

export default TableTest;
