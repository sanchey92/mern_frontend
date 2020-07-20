import React, {FC, useContext, useState} from "react";
import './PlaceListItem.css'
import Card from "../../../shared/components/UIElements/Card/Card";
import Button from "../../../shared/components/FormElements/Button/Button";
import Modal from "../../../shared/components/UIElements/Modal/Modal";
import Map from "../../../shared/components/UIElements/Map/Map";
import {AuthContext} from "../../../shared/context/authContext";
import {useHttpClient} from "../../../shared/hooks/httpHook/httpHook";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal/ErrorModal";
import Spinner from "../../../shared/components/UIElements/Spinner/Spinner";

interface IProps {
  id: string,
  title: string,
  description: string,
  image: string,
  address: string,
  creatorId: string,
  coordinates: any,
  onDelete: Function
}

const PlaceListItem: FC<IProps> = (props) => {
  const {isLoading, error, sendRequest, clearError} = useHttpClient()
  const {id, image, address, title, description, coordinates, onDelete, creatorId} = props
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);
  const openConfirmHandler = () => setShowConfirmModal(true);
  const closeConfirmModal = () => setShowConfirmModal(false);

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(`http://localhost:5000/api/places/${id}`, 'DELETE', null, {
        Authorization: `Bearer ${auth.token}`
      })
    } catch (e) {
      console.log(e)
    }
    onDelete(id)
  }

  return (
    <>
      <ErrorModal onClear={clearError} error={error}/>
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
      <Modal
        show={showConfirmModal}
        header='Are you sure?'
        footerClass='place-item__modal-actions'
        footer={
          <>
            <Button onClick={closeConfirmModal} inverse>CANCEL</Button>
            <Button onClick={confirmDeleteHandler} danger>DELETE</Button>
          </>
        }
      >
        <p>Do you want to proceed and delete this place?</p>
      </Modal>
      <li className='place-item' key={id}>
        <Card className='place-item__content'>
          {isLoading && <Spinner asOverlay/>}
          <div className='place-item__image'>
            <img src={`http://localhost:5000/${image}`} alt={title}/>
          </div>
          <div className='place-item__info'>
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className='place-item__actions'>
            <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
            { auth.userId === creatorId && (
              <>
              <Button to={`/places/${id}`}>EDIT</Button>
              <Button danger onClick={openConfirmHandler}>DELETE</Button>
              </>)
            }
          </div>
        </Card>
      </li>
    </>
  )
}

export default PlaceListItem