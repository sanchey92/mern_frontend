import React, {FC, useState} from "react";
import './PlaceListItem.css'
import Card from "../../../shared/components/UIElements/Card/Card";
import Button from "../../../shared/components/FormElements/Button/Button";
import Modal from "../../../shared/components/UIElements/Modal/Modal";
import Map from "../../../shared/components/UIElements/Map/Map";

interface IProps {
  id: string,
  title: string,
  description: string,
  image: string,
  address: string,
  creatorId: string,
  coordinates: any
}

const PlaceListItem: FC<IProps> = (props) => {

  const {id, image, address, title, description, creatorId, coordinates} = props

  const [showMap, setShowMap] = useState<boolean>(false);
  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  return (
    <>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={address}
        contentClass='place-item__modal-content'
        footerClass='place-item__modal-actions'
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className='map-container'>
          <Map center={coordinates} zoom={16}/>
        </div>
      </Modal>
      <li className='place-item' key={id}>
        <Card className='place-item__content'>
          <div className='place-item__image'>
            <img src={image} alt={title}/>
          </div>
          <div className='place-item__info'>
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className='place-item__actions'>
            <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
            <Button to={`/places/${id}`}>EDIT</Button>
            <Button danger>DELETE</Button>
          </div>
        </Card>
      </li>
    </>
  )
}

export default PlaceListItem