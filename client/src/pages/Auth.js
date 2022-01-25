import React, { useContext, useState } from 'react';
import { Container, Button, Col, Form, FormControl, Row } from "react-bootstrap";
import { Context } from '../index';
import { regUser, getUsers } from '../userApi';

const Auth = ({isAuth}) => {
    const { user } = useContext(Context)
  const [username, setUserName] = useState([])
  const [surname, setSurname] = useState([])
  const [info, setInfo] = useState([])

  const addInfo = () => {
    setInfo([...info, {title: '', number: Date.now()}])
  }

  const removeInfo = (number) => {
    setInfo(info.filter(i => i.number !== number))
  }

  const changeInfo = (key, value, number) => {
    setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
  }

  const addUser = async () => {
    const users = []
    await getUsers().then(data => data.map( d => users.push(d) ) )
    let findUser = users.find(u => u.username === username && u.surname === surname)
    if( !findUser ){
        findUser = await regUser({"username": username, "surname": surname, "santafor": '', "info": JSON.stringify(info), "admin": false}).then(data => {
            console.log(data)
            user.setUser(data)
            isAuth(true)
        })
    } else {
        user.setUser(findUser)
        isAuth(true)
    }
  }

  const checkValue = (e, value) => {
    let reg = /^[а-яё]*$/i
    if( reg.test(e) ){
        return(e)
    } else {return(value)}
  }


    return (
        <Container>
      <h1>Привет</h1>
      <Form>
        <Form.Control
          value={username}
          onChange={e => setUserName(checkValue(e.target.value, username))}
          className="mt-3"
          placeholder={"Введите имя"}
        />
        <hr/>
        <Form.Control
          value={surname}
          onChange={e => setSurname(checkValue(e.target.value, surname))}
          className="mt-3"
          placeholder={"Введите фамилию/Ник"}
        />
        <hr/>
        <Button
            id="addbutton"
            onClick={addInfo}
            variant={"outline-dark"}
        >Добавить новое желание</Button>
        
        {info.map(i =>
          <Row className="mt-3" key={i.number}>
            <Col md={4}>
            <FormControl
              value={i.title}
              onChange={(e) => changeInfo('title', checkValue(e.target.value, i.title), i.number)}
              placeholder="Я хочу ..."
            />
              <Button onClick={() => removeInfo(i.number)} variant={"outline-danger"}>Удалить</Button>
            </Col>
          </Row>    
        )}

        <hr/>
        {info[0] && info[0].title !== '' && username && surname ?
            <Button onClick={addUser} >Отправить</Button>
        :''}
      </Form>
    </Container>
    );
};

export default Auth