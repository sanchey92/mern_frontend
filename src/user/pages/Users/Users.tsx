import React, {FC, useEffect, useState} from "react";
import UserList from "../../components/UsersList/UsersList";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal/ErrorModal";
import Spinner from "../../../shared/components/UIElements/Spinner/Spinner";
import {useHttpClient} from "../../../shared/hooks/httpHook/httpHook";

const Users: FC = () => {
  const {isLoading, error, sendRequest, clearError} = useHttpClient()
  const [loadedUsers, setLoadedUsers] = useState(null)

  useEffect(() => {

    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest('http://localhost:5000/api/users/');
        setLoadedUsers(responseData.users)
      } catch (err) {
      }
    }
    fetchUsers()
  }, [sendRequest])

  return (
    <>
      <ErrorModal onClear={clearError} error={error}/>
      {
        isLoading && (
          <div className='center'>
            <Spinner asOverlay/>
          </div>
        )
      }
      {!isLoading && loadedUsers && <UserList items={loadedUsers}/>}
    </>
  )
}
export default Users
