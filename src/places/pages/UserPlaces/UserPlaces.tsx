import React, {FC, useEffect, useState} from "react";
import PlaceList from "../../components/PlaceList/PlaceList";
import {useParams} from "react-router-dom";
import {useHttpClient} from "../../../shared/hooks/httpHook/httpHook";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal/ErrorModal";
import Spinner from "../../../shared/components/UIElements/Spinner/Spinner";

interface Params {
  userId: string
}

const UserPlaces: FC = () => {
  const userId = useParams<Params>().userId;
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState()

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
        setLoadedPlaces(responseData.places)
      } catch (e) {
        console.log(e)
      }
    }
    fetchPlaces()
  }, [sendRequest, userId])

  const placeDeleteHandler = (deletedPlaceId: string) => {
    setLoadedPlaces((prevState:any) => prevState.filter((place:any) => place.id !==  deletedPlaceId))
  }

  return (
    <>
      <ErrorModal onClear={clearError} error={error}/>
      {
        isLoading && (
          <div className='center'>
            <Spinner/>
          </div>
        )
      }
      {!isLoading && loadedPlaces && <PlaceList
        items={loadedPlaces}
        onDeletePlace={placeDeleteHandler}/>}
    </>
  )
}

export default UserPlaces