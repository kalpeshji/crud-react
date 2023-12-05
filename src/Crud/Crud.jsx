import React, { useEffect, useState } from 'react';
import './assets/css/style.css'

export default function Crud() {
    const [data, setData] = useState(() => {
        return JSON.parse(localStorage.getItem('data')) || []
    })
    const [input, setInput] = useState({})
    const [error, setError] = useState({})
    const [edit, isEdit] = useState(false)
    const [id, setId] = useState()

    useEffect(() => {
        localStorage.setItem("data", JSON.stringify(data))
    }, [data])

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (edit && id !== null) {
            const updatedData = [...data];
            updatedData[id] = input;
            setData(updatedData);
            isEdit(false);
            setId(null);
        } else {
            handleAdd()
        }
        setInput({});
    }

    const handleDelete = (id) => {
        const userData = [...data]
        userData.splice(id, 1)
        setData(userData)
    }

    const handleUpdate = (id) => {
        setInput({ ...data[id] });
        isEdit(true);
        setId(id);
    }

    const handleAdd = () => {
        const newError = {};
        if (input.name && input.email && input.phone && input.add) {
            setData([...data, { ...input }]);
            setInput({});
        } else {
            if (!input.name) {
                newError.name = 'Name is required!';
            }
            if (!input.email) {
                newError.email = 'Email is required!';
            }
            if (!input.phone) {
                newError.phone = 'Phone is required!';
            }
            if (!input.add) {
                newError.add = 'Address is required!';
            }
        }
        setError(newError);
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h3>Add Student</h3>
                <input type="text" name='name' onChange={handleChange} value={input.name || ''} placeholder="Student Name *" />
                <p className='error'>{error.name}</p>
                <input type="email" name='email' onChange={handleChange} value={input.email || ''} placeholder="Student Email *" />
                <p className='error'>{error.email}</p>
                <input type="tel" name='phone' pattern='[0-9]{10}' onChange={handleChange} value={input.phone || ''} placeholder="Student Number *" />
                <p className='error'>{error.phone}</p>
                <input type="text" name='add' onChange={handleChange} value={input.add || ''} placeholder="Student Address *" />
                <p className='error'>{error.add}</p>
                <button type="submit">{edit ? 'Update' : 'Add'}</button>
            </form>
            <div className="data">
                <table border={1}>
                    <thead>
                        <tr>
                            <th>S.R. No.</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>PHONE NUMBER</th>
                            <th>ADDRESS</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((item, index) =>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.add}</td>
                                <td><div className="d-flex justify-between"><button onClick={() => handleDelete(index)}>Delete</button><button onClick={() => handleUpdate(index)}>Edit</button></div></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}
