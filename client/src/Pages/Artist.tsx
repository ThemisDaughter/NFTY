//react
import { Link, useParams } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
//antd imports
import { Button } from 'antd';
//services
import { getAllAlbums, getAllAlbumsbyArtistId } from 'Services/Album';
import { getEvents, getEventsByArtistId } from 'Services/Event';
import { getAllMerchandises, getAllMerchandisesbyArtistId } from 'Services/Merchandise';
//components
import StyledPage from 'Styles/styledComponents/styledPage';
import StyledButton from 'Styles/styledComponents/StyledButton';
//styling
import StyledArtistProfile from 'Styles/styledComponents/StyledArtistProfile';
// import './Artist.css'
//Datatypes
import { IAlbum, IEvent, IMerchandise } from '../Data/DataTypes';
//context is being used in this component
import { UserContext } from 'Data/UserContext';
import AlbumInputBar from 'Components/FormComponents/DataComponents/AlbumForm2';
import EventInputBar from 'Components/FormComponents/DataComponents/EventForm2';
import MerchandiseInputBar from 'Components/FormComponents/DataComponents/MerchandiseForm2';
import { isTypeOnlyImportOrExportDeclaration } from 'typescript';





const ArtistPage: React.FunctionComponent = () => {


  const [type, setType] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [albums, setAlbums] = useState<IAlbum[] | []>([]);
  const [events, setEvents] = useState<IEvent[] | []>([]);


  const [artistAlbums, setArtistAlbums] = useState<IAlbum[] | []>([]);

  // const [upcomingEvents, setUpcomingEvents] = useState<IEvent [] | []>([]);
  const [merchandise, setMerchandise] = useState<IMerchandise[] | []>([]);

//   declare function useParams<
//   K extends string = string
// >(): Readonly<Params<K>>;
  
  interface PropsRoute {
    artistId?: string;
  }
  // const { artistId } = useParams<PropsRoute>();
  
  
  // const currentArtistId = artistId && parseInt(artistId);
  
  const closeDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setType('');
  }

  // const { currentId } = useContext(UserContext);

  useEffect(() => {
    // const artistId: number = parseInt(location.pathname.replace(/[^0-9.]+/g, ''))
    // const artistAlbums = getAllAlbumsbyArtistId(artistId);
    // const artistMerch = getAllMerchandisesbyArtistId(artistId);
    // const artistEvebts = getEventsByArtistId(artistId);
    // console.log(currentArtistId)

    //@ts-ignore

    getAllAlbumsbyArtistId(currentArtistId: number)
      .then(res => setArtistAlbums(res))
   

    getAllAlbums()
      .then((response: IAlbum[]) => {
        if (response) {
          response.sort((firstItem, secondItem) => secondItem.createdAt.getTime() - firstItem.createdAt.getTime())
          setAlbums(response)
        }
        else setAlbums(response)
      })
      .catch(error => {
        console.log(error)
        console.log("Error occured.")
      })
    
    getEvents()
      .then((response: IEvent[]) => {
        if (response) {
          response.sort((firstItem, secondItem) => secondItem.createdAt.getTime() - firstItem.createdAt.getTime())
          setEvents(response)
        }
      })
      .catch(error => {
        console.log(error)
        console.log("Error occured.")
      })
    getAllMerchandises()
      .then((response: IMerchandise[]) => {
        if (response) {
          response.sort((firstItem, secondItem) => secondItem.createdAt.getTime() - firstItem.createdAt.getTime())
          setMerchandise(response)
        }
      })
      .catch(error => {
        console.log(error)
        console.log("Error occured.")
      })
  }, [])
  const handleAlbumState = () => setType('album');
  const handleEventState = () => setType('event');
  const handleMerchandiseState = () => setType('merchandise');


  return (
    <StyledPage>
      <StyledArtistProfile>
        <Link to="/">home</Link>
        <h1>Artist</h1>
        <p>To upload new NFTs to your profile, please select
          from the following category and input required information: </p>
        <div className="buttons">
        <StyledButton  onClick={handleAlbumState} color="#33e">album</StyledButton>
        <StyledButton onClick={handleEventState}>event</StyledButton>
          <StyledButton  onClick={handleMerchandiseState}>merchandise</StyledButton>
        </div>
        {(type === 'album') ? <AlbumInputBar albums={albums} onClose={ closeDropdown } setAlbums={setAlbums} /> : null}
        {(type === 'event') ? <EventInputBar events={events} onClose={ closeDropdown } setEvents={setEvents} /> : null}
        {(type === 'merchandise') ? <MerchandiseInputBar merchandise={merchandise} onClose={ closeDropdown } setMerchandise={setMerchandise} /> : null}    <p>artist view with option to update offers</p>
        <p>user view without any authorisations but with fake follow button</p>
      </StyledArtistProfile>
    </StyledPage>
  )
}
export default ArtistPage;














