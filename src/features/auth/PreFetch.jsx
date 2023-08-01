import { store } from '../../app/store'
import { notesApiSlice } from '../notes/notesApiSlice'
import { usersApiSlice } from '../users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const PreFetch = () => {

    useEffect(() => {
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
        const notes = store.dispatch(notesApiSlice.endpoints.getUsers.initiate())

        return () => {
            notes.unsubscribe()
            users.unsubscribe()
        }
    }, [])

  return <Outlet />
}

export default PreFetch