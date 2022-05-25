import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import './form.css'
import axios from 'axios';
import { Context } from '../../context/mainContext';


function Form() {
    const subscribetoContext = useContext(Context);
    const { setTaskData } = subscribetoContext;
    const navigate = useNavigate();

    const [taskState, setTaskState] = useState({
        name: '',
        details: '',
    });
    const [tdate, onChange] = useState(new Date('yyyy-mm-dd'));
    const [times, setTimes] = useState({
        start: '',
        end: ''
    });
    const [status, setStatus] = useState('active');

    // task input handles

    const tInputHandler = (e) => {
        let val = e.target.name;
        if (val === 't-name') {
            setTaskState({
                ...taskState, name: e.target.value
            })
        }
        if (val === 't-detail') {
            setTaskState({
                ...taskState, details: e.target.value
            })
        }
    }

    // time duration

    const timeHandles = (e) => {
        let val = e.target.name;
        if (val === 'apptstart') {
            setTimes({
                ...times, start: e.target.value
            })
        }
        if (val === 'apptend') {
            setTimes({
                ...times, end: e.target.value
            })
        }
    }

    // drop down handles

    const dropHandle = (e) => {
        let currentStatus = e.target.value;
        setStatus(currentStatus);
    }

    // calculate duration

    const calculateduration = () => {
        if (times) {
            let diff = (new Date(times?.start).getTime() - new Date(times?.end).getTime()) / 1000;
            diff /= 60;
            return Math.abs(Math.round(diff)); // result in minute
        }
    }

    // handleSubmit

    const handleSubmit = async (e) => {
        e.preventDefault();
        const maindate = tdate.target.value;
        const duration = calculateduration();
        const mainObj = {
            name: taskState?.name,
            date: maindate,
            time: duration, // in minute
            details: taskState?.details,
            status: status
        }

        axios
            .post('http://localhost:3001/tasks', mainObj)
            .then(response => {
                console.log(response);
                setTaskData(response.data)
            })

        setTaskState({
            name: '',
            details: '',
        });

        setTimes({
            start: '',
            end: ''
        });

        navigate('/');
    }

    return (
        <div className='form-container'>
            <h3> Create New Task </h3>
            <form className='pop' onSubmit={handleSubmit}>
                <div className='form-part'>
                    <label htmlFor='t-name'>
                        Name
                    </label>
                    <input onChange={tInputHandler} value={taskState?.name} name='t-name' className='name-input' type='text' />
                </div>

                <div className='form-part'>
                    <label htmlFor='t-date'>
                        Date
                    </label>
                    <input onChange={onChange} className='input-date' type='date' />
                </div>

                <div className='form-s-part'>
                    <label htmlFor='time'>Time</label>
                    <div className='form-sub-part'>
                        <input onChange={timeHandles} className='time-input' type="datetime-local" id="appt" name="apptstart"></input>
                    </div>

                    <div className='form-sub-part'>
                        <input onChange={timeHandles} className='time-input' type="datetime-local" id="appt" name="apptend"></input>
                    </div>
                </div>

                <div className='form-part'>
                    <label htmlFor='t-details'>
                        Detail
                    </label>
                    <textarea onChange={tInputHandler} name='t-detail' className='t-des' type='text' />
                </div>

                <div className='form-part'>
                    <label htmlFor='statuss'>
                        Status
                    </label>
                    <select defaultValue={status} onSelect={dropHandle} className='t-status'>
                        <option value={'active'} name='active'>active</option>
                        <option value={'pending'} name='pending'>pending</option>
                        <option value={'outdated'} name='outdated'>outdated</option>
                    </select>
                </div>

                <div className='form-btn'>
                    <button className='btn btn-secondary bto' type="submit">Add</button>
                </div>
            </form>
        </div>
    )
}

export default Form
