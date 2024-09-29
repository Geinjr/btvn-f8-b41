import './style.css'
const FCommonTable = ({ columns, rows, onEdit, onDelete }) => {
    return (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr>
                    {columns.map(column => (
                        <th key={column}>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => (
                    <tr key={row.id}>
                        {columns.map(column => (
                            column === 'action' ? (
                                <td key={`${row.id}-${column}`}>
                                    <button onClick={() => onEdit(row)}>Edit</button>
                                    <button onClick={() => onDelete(row.id)}>Delete</button>
                                </td>
                            ) : (
                                <td key={`${row.id}-${column}`}>{row[column]}</td>
                            )
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default FCommonTable;
