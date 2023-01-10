import './App.css';
import  {useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [user, setUser] = useState([]);
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [update, setUpdate] = useState({id:"", name:""})
 
  useEffect(()=>{
    loadData()
  },[]);



  const loadData = async ()=>{
  const response = await axios.get('http://localhost:3003/users');
  console.log(response.data)
  setUser(response.data)
  }

  const AddUser = (e)=>{

    e.preventDefault();
    // console.log(id,name)
    axios.post('http://localhost:3003/users' ,{
      id, name 
    }).then(()=>{
      setId("");setName("");
    }).catch((err)=>{
      console.log(err);
    })

    setTimeout(() => {
      loadData();
    }, 500);
  }

  const deleteUser = (id)=>{
    // console.log(id)
    axios.delete(`http://localhost:3003/users/${id}`)
    setTimeout(() => {
      loadData()
    }, 500);
  }

  const updateUser = ()=>{
    // console.log(update.id, update.name);
    axios.put(`http://localhost:3003/users/${update.id}`,{
      id:update.id, name:update.name
    }).then((response)=>{
      console.log(response)
    }).catch((e)=>{console.log(e)})
  }

  setTimeout(() => {
    loadData()
  }, 500);

  return (
    <div className="App">
    <h1>Crud Operation</h1>

    <input placeholder='Enter Id' value={id} onChange={e => setId(e.target.value)}/>
    <input placeholder='Enter Name' value={name} onChange={e => setName(e.target.value)}/>
    <button onClick={AddUser}>Add</button>
    <br/><br/>
    {user.map(e => (
      <div key={e.id} className="box">

      <div className='box-1'>
      {e.id} {e.name} <button onClick={()=>{deleteUser(e.id )}}>Delete</button>
      </div>
       <div>
       <br/>
       <div className='box-2'>
        <input type="text" placeholder='Update ID' onChange={e => setUpdate({...update, id:e.target.value})}/>
        <input type="text" placeholder='Update Name' onChange={e => setUpdate({...update, name:e.target.value})}/>
        <button onClick={updateUser}>Update</button>
        </div>
        </div>
      </div>
    ))}
      
    </div>
  );
}

export default App;
