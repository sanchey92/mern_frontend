import React, {FC} from "react";
import UserList from "../../components/UsersList/UsersList";

const Users: FC = () => {

  const USERS = [{
    id: 'u1',
    name: 'Alexandr Ageev',
    image: 'https://sun1-14.userapi.com/vHzNtL3NlzGKo-8K-jKl9-AW-6knWjiai3Io_w/I1nQrt_IsAM.jpg',
    places: 3
  }]

  return (
    <UserList items={USERS}/>
  )
}
export default Users
