import React, { useEffect, useState } from 'react'
import { Container, Grid, Menu, Input, Icon, Button } from 'semantic-ui-react'
import axios from 'axios'
import 'semantic-ui-css/semantic.min.css'

import Todo from '../components/Todo'
import CompletedTodo from '../components/CompletedTodo'

export default function Home(props) {
  const [todos, setTodos] = useState([])
  const [completed, setCompleted] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    props.data.map(res => {
      if (res.complete === false) {
        setTodos(todos => [...todos, res])
      } else {
        setCompleted(completed => [...completed, res])
      }
    })

  }, [])

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }
  
  const submitTodo = async () => {
    const createdTodo = {
      title,
      description,
      complete: false
    }

    try {
     const newTodo = await axios.post(`/api/todo`, createdTodo)
     console.log(newTodo)
     location.reload();
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Container>
      <br />
      <br />
      <br />
      <Grid textAlign='center' columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Menu fluid vertical>
              <Menu.Item className='header'>To Do's: </Menu.Item>

              {todos.map(todo => {
                return (
                  <Todo title={todo.title} description={todo.description} id={todo._id} />
                )
              })}

            </Menu>
          </Grid.Column>
          <Grid.Column>
            <Menu fluid vertical>
              <Menu.Item className='header'>Completed Tasks: </Menu.Item>
              {completed.map(todo => {
                console.log(todo)
                return (
                  <CompletedTodo title={todo.title} description={todo.description} id={todo._id} />
                )
              })}
            </Menu>
          </Grid.Column>
        </Grid.Row>

          <Grid.Row style={{ marginBottom: '10px' }}>

            <Input label='Title:' placeholder='Enter Here' rows="5" onChange={handleTitleChange}/>
          </Grid.Row>

          <Grid.Row style={{ marginBottom: '10px' }}>
            <Input label="Description:" placeholder='Search...' onChange={handleDescriptionChange}/>
          </Grid.Row>

          <Grid.Row>
            <Button icon labelPosition='right' onClick={submitTodo}>
              Submit
             <Icon name='right arrow' />
            </Button>
          </Grid.Row>

      </Grid>
    </Container>
  )
}

export const getStaticProps = async () => {
  const { data } = await axios.get('http://localhost:3000/api/todo');

  return {
    props: {
      data,
    },
  };
};
