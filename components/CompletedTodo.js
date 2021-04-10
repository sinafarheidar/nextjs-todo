import React from 'react'
import { Menu, Button, Icon, Grid } from 'semantic-ui-react'
import axios from 'axios'

function CompletedTodo(props) {

  const id = props.id

  const handleClick = async () => {
    try {
      const deleteTodo = await axios.delete(`/api/todos/${id}`)
      console.log(deleteTodo)
      location.reload();
    } catch (err) {
      console.log(err)
    }
    
  }

  return (
    <Menu.Item>
      <Grid style={{ justifyContent: "center" }}>
        <Grid.Row columns={1}>
          {props.title} - {props.description}
        </Grid.Row>
        <Grid.Row columns={1}>
          <Button animated size='mini' onClick={handleClick} style={{ marginLeft: '10px' }}>
            <Button.Content visible>Delete Todo</Button.Content>
            <Button.Content hidden>
              <Icon name='arrow right' />
            </Button.Content>
          </Button>
        </Grid.Row>
      </Grid>
    </Menu.Item>
  )
}

export default CompletedTodo
