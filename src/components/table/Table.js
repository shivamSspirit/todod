import React, { useContext, useEffect, useState } from 'react'
import './table.css'
import { Context } from '../../context/mainContext'
import { useNavigate } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';

function Tables() {

  let subscribetoContext = useContext(Context);
  const navigate = useNavigate();
  const { defaultTaskList } = subscribetoContext;
  const [OPtions, setOptions] = useState(null);
  const [showFiltered, setShowFilterd] = useState(null);
  const [dropVal, setDropVal] = useState(null);


  useEffect(() => {
    if (defaultTaskList) {
      // first set dates to dropdown
      let filtered = defaultTaskList?.map(item => item?.date);
      setOptions(filtered);
    }
  }, [defaultTaskList])

  useEffect(() => {
    if (OPtions) {
      setDropVal(OPtions[0])
    }
  }, [OPtions, defaultTaskList])


  useEffect(() => {
    if (dropVal) {
      const handleFul = () => {
        const mainD = defaultTaskList?.filter(item => item?.date === dropVal);
        setShowFilterd(mainD);
      }

      handleFul();
    }

  }, [dropVal])


  const handleDrop = (e) => {
    const target = e.target.value;
    setDropVal(target);
  }

  return (
    <div>
      <div className="container">
        <div className='date-filter'>
          <label className='lab' htmlFor='drops'>
            Filter Tasks
            <select className='drop-class' value={dropVal && dropVal} onChange={handleDrop}>
              {OPtions && OPtions?.map((item, i) => (
                <option selected={dropVal === item} value={`${item}`} key={`opt${i}`}>
                  {item}
                </option>
              ))}
            </select>
          </label>

        </div>

        <h1>Simple Task Table</h1>

        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>TaskName</th>
              <th>TaskDate</th>
              <th>TimeDuration</th>
              <th>Details</th>
              <th>Stauts</th>
            </tr>
          </thead>

          {showFiltered && showFiltered?.length < 2
            ?
            <tbody>
              <tr>
                <td colSpan={5}>
                  <div>
                    <button onClick={() => navigate('/addtask')}>pls add more task</button>
                  </div>
                </td>
              </tr>
            </tbody>
            :
            <tbody>
              {showFiltered?.map((item, key) => (
                <tr key={`teb${key}`}>
                  <td>{item?.name}</td>
                  <td>{item?.date}</td>
                  <td>{item?.time}</td>
                  <td>{item?.details}</td>
                  <td>{item?.status}</td>
                </tr>
              ))}
            </tbody>
          }

        </Table>
      </div>
    </div>
  )
}

export default Tables
