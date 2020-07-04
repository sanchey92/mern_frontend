import React, {FC, useEffect, useState} from "react";
import UserList from "../../components/UsersList/UsersList";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal/ErrorModal";
import Spinner from "../../../shared/components/UIElements/Spinner/Spinner";

const Users: FC = () => {

  const [isloading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState(null)
  const [loadedUsers, setLoadedUsers] = useState(null)

  useEffect(() => {

    const sendRequest = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('http://localhost:5000/api/users/');
        const responseData = await response.json()
        if (!response.ok) throw new Error(responseData.message || 'Something went wrong, please try again later')
        setLoadedUsers(responseData.users)

      } catch (err) {
        setError(err.message)
      }
      setIsLoading(false)
    }

    sendRequest()
  }, [])

  const errorHandler = () => setError(null)

  return (
    <>
      <ErrorModal onClear={errorHandler} error={error}/>
      {
        isloading && (
          <div className='center'>
            <Spinner/>
          </div>
        )
      }
      {!isloading && loadedUsers && <UserList items={loadedUsers}/>}
    </>
  )
}
export default Users
