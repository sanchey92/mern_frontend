import React, {FC} from "react";
import PlaceList, {Places} from "../../components/PlaceList/PlaceList";
import { useParams } from "react-router-dom";

export const TESTS_DATA: Places[] = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u2'
  }
];

interface Params {
  userId: string
}

const UserPlaces: FC = () => {
  const userId = useParams<Params>().userId
  const USERS_PLACES: Places[] = TESTS_DATA.filter((place: Places) => place.creator === userId )
  return <PlaceList items={USERS_PLACES}/>

}

export default UserPlaces