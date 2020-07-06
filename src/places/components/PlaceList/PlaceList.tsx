import React, {FC} from "react";
import './PlaceList.css'
import Card from "../../../shared/components/UIElements/Card/Card";
import PlaceListItem from "../PlaceListItem/PlaceListitem";
import Button from "../../../shared/components/FormElements/Button/Button";

export interface Places  {
  id: string
  title: string,
  description: string,
  image: string,
  address: string,
  location: any
  creator: string,
}

interface IProps {
  items: Places[],
  onDeletePlace: Function
}

const PlaceList: FC<IProps> = ({items, onDeletePlace}) => {
  if (items.length === 0) {
    return (
      <div className='place-list center'>
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <Button to='/places/new'>Share Place</Button>
        </Card>
      </div>
    )
  }
  return (
    <ul className='place-list'>
      {
        items.map((place) => {
          return (
          <PlaceListItem
            key={place.id}
            id={place.id}
            image={place.image}
            title={place.title}
            address={place.address}
            description={place.description}
            creatorId={place.creator}
            coordinates={place.location}
            onDelete={onDeletePlace}
          />
          )
        })
      }
    </ul>
  )
}

export default PlaceList