import React, {FC} from "react";
import './PlaceList.css'
import Card from "../../../shared/components/UIElements/Card/Card";
import PlaceListItem from "../PlaceListItem/PlaceListitem";

export interface Places  {
  id: string
  title: string,
  description: string,
  imageUrl: string,
  address: string,
  location: any
  creator: string,
}

interface IProps {
  items: Places[]
}

const PlaceList: FC<IProps> = ({items}) => {
  if (items.length === 0) {
    return (
      <div className='place-list center'>
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <button>Share Place</button>
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
            image={place.imageUrl}
            title={place.title}
            address={place.address}
            description={place.description}
            creatorId={place.creator}
            coordinates={place.location}
          />
          )
        })
      }
    </ul>
  )
}

export default PlaceList