import React, {FC} from "react";
import './UserList.css'
import UserItem from "../UserItem/UserItem";

interface IProps {
  items: any[] | null
}

const UserList: FC<IProps> = ({items}) => {
  return (
    <>
      {
        items!.length === 0
          ? (
            <div className="center">
              <h2>No Users found</h2>
            </div>
          )
          : (
            <ul className='users-list'>
              {
                items!.map((user: any) => {
                  return (
                    <UserItem
                      key={user.id}
                      id={user.id}
                      image={user.image}
                      name={user.name}
                      placeCount={user.places.length}
                    />
                  )
                })
              }
            </ul>
          )
      }
    </>
  )
}

export default UserList