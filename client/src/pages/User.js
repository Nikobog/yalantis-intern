import React, { useContext, useState } from 'react';
import { Container, Col, Row, Button } from "react-bootstrap";
import { Context } from '..';
import { getUsers, putUsers } from '../userApi';

const User = ({isAuth}) => {
    const { user } = useContext(Context)
    const [userLength, setUserLength] = useState('')
    let admin = user._user.admin
    let santa = (user._user.santafor.length > 0) ? JSON.parse(user._user.santafor) : '';
    console.log(admin, santa)
    let santaInfo = (santa.info) ? JSON.parse(santa.info) : ''
    let info = (user._user.info) ? JSON.parse(user._user.info) : [];
    
    const checkUsers = async () => {
        let users = []
        await getUsers().then(data => data.map( (d, i) => users.push({id: d.id, username: d.username, surname: d.surname, info: d.info, santafor: d.santafor}) ) )
        setUserLength(users.length)
        console.log(users.length)
        if( userLength >= 3 || userLength <= 500) {
            shufle(users)
        } else {
            console.log('Участников не достаточно')
        }
    }

  const shufle = (users) => {
    for(let sh = 0; sh < users.length; sh++) {
      let exlId = []
      let uSe = []
      exlId.push(sh + 1)
      let usersId = users.map((u) => {
        if(u.santafor !== '' && (sh + 1) !== u.santafor){
          exlId.push(u.santafor)
        }
        return u.id;
      })
      for(var i = 0; i < usersId.length; i++){
        if(exlId.indexOf(usersId[i]) === -1 && i !== usersId[i]) {
          uSe.push(usersId[i])
        }
      }
      let rand = uSe[Math.floor(Math.random() * uSe.length)]
      users[sh].santafor = rand
    }
    if(!users[(users.length - 1)].santafor){
      console.log('Получилось так что последнему участнику достался его Id, обнулим у всех юзеров параметр santafor и запустим ещё раз')
      users.map((u) => u.santafor = '')
      shufle(users)
    } else {
        users.map( u => putUsers( u.id, JSON.stringify( users.find(us => us.id === u.santafor)) ) )
    }
  }


    return (
        <Container>
            <Row>
                <Col>{user._user.username}</Col>
                <Col>{user._user.surname}</Col>
                <hr/>
                <Col>Желания:</Col>
                {info.map( (info, i)  => 
                    <Col key={i} >{(i + 1)}: {info.title}</Col>    
                )}
                <hr/>
                {santa && santaInfo !== '' ?
                    <div>Вы санта для участника: {santa.username} {santa.surname} <br/>Желания участника:<br/>{santaInfo.map(s => `- ${s.title}; \n`)}</div>
                :''}
                
                <Col style={{margin:'20px 0'}}><Button style={{cursor: 'pointer'}} onClick={() => isAuth(false)}
                >Выйти</Button></Col>
                {admin && santa === '' ? 
                    <Col><Button style={{cursor: 'pointer'}} onClick={checkUsers}>Разыграть</Button></Col>
                :''}
            </Row>
        </Container>
    );
};

export default User