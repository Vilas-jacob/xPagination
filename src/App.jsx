import { useEffect, useState } from 'react'
import './App.css'
import Pagination from './Components/Pagination';

function App() {
  //const [count, setCount] = useState(0)
  const [empData,setEmpData]=useState([]);
  const [currentPage,setCurrentPage]=useState(1);
  const [rowsPerPage,setRowsPerPage]=useState(10);

  async function getEmpData(){
    try{
      const response =  await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
      if(!response.ok){
        throw new Error(`Response Status: ${response.status}`);
      }
      const responseData = await response.json();
      setEmpData(responseData);
      //console.log(responseData);
    }catch(error){
      console.error("Error fetching data: "+error.message);
    }
  }

  useEffect(()=>{
    getEmpData();
  },[]);

  const lastRowIndex = currentPage * rowsPerPage;
  const firstRowIndex = lastRowIndex - rowsPerPage;

  const currentRows = empData.slice(firstRowIndex,lastRowIndex);
  return (
    <>
      <div className='header'>
        <h1>Employee Data Table</h1>
      </div>
      <div>
        <table id="employee">
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
          </thead>
          <tbody>
            {currentRows.map((emp)=>(
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination totalRows={empData.length} rowsPerPage={rowsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  )
}

export default App
