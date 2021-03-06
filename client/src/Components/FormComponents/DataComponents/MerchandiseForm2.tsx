import { useState, useContext } from 'react';
import { storage } from '../../../Firebase/index'
import { Input, Label } from '@rebass/forms'
import { Text, Button } from "rebass";
import { createMerchandise } from 'Services/Merchandise';
import { UserContext } from 'Data/UserContext';

function MerchandiseInputBar(props: any) {

  const [image, setImage] = useState();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [tokensNumber, setTokensNumber] = useState(0);
  const [tokensValue, setTokensValue] = useState(0);
  const [progress, setProgress] = useState(0);
  const { currentId } = useContext(UserContext);
  const [artistId, setArtistId] = useState(currentId);



  const addMerchandise = async (name: string, type: string, description: string, tokensNumber: number, img_url: string, tokensValue: number, artistId: number) => {
    // const newMerchandises = props.merchandises.slice();
    const response = await createMerchandise({ name, type, description, tokensNumber, img_url, tokensValue, artistId })
    // newMerchandises.push(response)
    // props.setMerchandises(newMerchandises); // need to import this from app
    return response;
  }

  const handleChange = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
  }

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.closeDropdown()
  }

  const handleSubmit = (evt: any) => {
    console.log("artistId", artistId)
    console.log("currentId", currentId)

    // @ts-ignore
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      (snapshot: { bytesTransferred: number; totalBytes: number; }) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress)
      },
      (error: any) => {
        console.log(error);
      },
      () => {
        storage
          .ref('images')
          // @ts-ignore
          .child(image.name)
          .getDownloadURL()
          .then((img: any) => {
            console.log(name, "name");
            console.log(type, "type");
            console.log(description, "description");
            console.log(tokensNumber, "tokensNumber");
            console.log(img, "img");
            console.log(tokensValue, "tokensValue");
            console.log(artistId, "artistId");
            addMerchandise(name, type, description, tokensNumber, img, tokensValue, artistId);
          })
      }
    )
    evt.preventDefault();
    setName((name: string) => name = '');
    setType((type: string) => type = '');
    setDescription((description: string) => description = '');
    setTokensNumber((tokensNumber: number) => tokensNumber = 0);
    setTokensValue((tokensValue: number) => tokensValue = 0);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <progress value={progress} max="100" />
        <Label>Merchandise Name</Label>
        <Input type="string" name="name" value={name} onChange={(evt: { target: { value: any; }; }) => setName(evt.target.value)} required></Input>
        <br />
        <Label>Merchandise Type</Label>
        <Input type="string" name="type" value={type} onChange={(evt: { target: { value: any; }; }) => setType(evt.target.value)} required></Input>
        <br />
        <Label>Description</Label>
        <Input type="string" name="description" value={description} onChange={(evt: { target: { value: any; }; }) => setDescription(evt.target.value)} required></Input>
        <br />
        <Label>Number of NFTs</Label>
        <Input type="number" name="tokensNumber" value={tokensNumber} onChange={(evt: { target: { value: string; }; }) => setTokensNumber(parseInt(evt.target.value))} required></Input>
        <br />
        <Label>Value of the NFT</Label>
        <Input type="number" name="tokensValue" value={tokensValue} onChange={(evt: { target: { value: string; }; }) => setTokensValue(parseInt(evt.target.value))} required></Input>
        <br />
        <Label>Upload NFT cover</Label>
        <Input type="file" onChange={handleChange} />
        <br />
        <Label></Label>
          <div className="buttons">
        <Button type="submit">
          <Text fontFamily='system-ui'>
            Upload Your NFT
          </Text>
        </Button>
        <Button
          onClick={handleCancel}>cancel</Button>
        </div>
      </form>
    </div>
  )
}

export default MerchandiseInputBar;
