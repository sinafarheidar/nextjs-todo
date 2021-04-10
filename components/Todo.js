import axios from 'axios'
import React from 'react'
import { Menu, Button, Icon, Grid } from 'semantic-ui-react'

function Todo(props) {

  const id = props.id

  const handleClick = async () => {
    try {
      const completedItem = await axios.post(`/api/todos/${id}`)
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
            <Button.Content visible>Complete Todo</Button.Content>
            <Button.Content hidden>
              <Icon name='arrow right' />
            </Button.Content>
          </Button>
        </Grid.Row>
      </Grid>
    </Menu.Item>
  )
}

export default Todo
