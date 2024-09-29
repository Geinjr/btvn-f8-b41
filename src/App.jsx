import { useState } from 'react';
import { v4 } from 'uuid';
import { FCommonTable } from './components'; // Đảm bảo đường dẫn đúng

function App() {
    const columns = ['id', 'name', 'age', 'gender', 'address', 'action'];
    const [users, setUsers] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [user, setUser] = useState({
        id: v4(),
        name: '',
        age: '',
        gender: 'male',
        address: ''
    });

    const onInput = (e, key) => {
        const updateUser = { ...user, [key]: e.target.value };
        setUser(updateUser);
    };

  
    const onSave = () => {
        if(!user.address && !user.age && !user.name){
            alert("Vui lòng nhập đầy đủ thông tin")
            return
        }
        
        
        if (editMode) {
            const updatedUsers = users.map((u) => (u.id === user.id ? user : u));
            setUsers(updatedUsers);
        } else {
            const newUser = { ...user, id: v4() };
            setUsers([...users, newUser]);
        }

        
        resetForm();
        setShowTable(true);
    };

   
    const resetForm = () => {
        setUser({
            id: v4(),
            name: '',
            age: '',
            gender: 'male',
            address: ''
        });
        setEditMode(false);
        setShowTable(true);
    };

    const handleEdit = (userToEdit) => {
        setUser(userToEdit);
        setEditMode(true); // Chuyển sang chế độ chỉnh sửa
        setShowTable(false); // Ẩn bảng
    };

    const handleDelete = (userId) => {
        const updatedUsers = users.filter((u) => u.id !== userId);
        setUsers(updatedUsers);
    };

    return (
        <div>
            <input type='text' placeholder='name' onChange={(e) => onInput(e, 'name')} value={user.name} />
            <input type='text' placeholder='age' onChange={(e) => onInput(e, 'age')} value={user.age} />
            <select value={user.gender} onChange={(e) => onInput(e, 'gender')}>
                <option value='male'>male</option>
                <option value='female'>female</option>
            </select>
            <input type='text' placeholder='address' onChange={(e) => onInput(e, 'address')} value={user.address} />
            <button onClick={onSave}>{editMode ? 'Update' : 'Save'}</button>

            {showTable && (
                <FCommonTable
                    columns={columns}
                    rows={users}
                    onEdit={handleEdit} // Truyền hàm handleEdit
                    onDelete={handleDelete} // Truyền hàm handleDelete
                />
            )}
        </div>
    );
}

export default App;
