import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewNoteForm from './NewNoteForm'

const NewNote = () => {
    const users = useSelector(selectAllUsers)

    if (!users.length > 0) return (<p>Not Currently Available</p>)

    const content = users ? <NewNoteForm users={users} /> : <p>Loading...</p>

    return content
}
export default NewNote