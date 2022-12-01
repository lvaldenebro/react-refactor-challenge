import '../styles/App.scss';
import ls from '../service/LocalStorage.js'
import dataApi from '../service/Api';
import { useState } from 'react';

import iconLogo from '../images/icono-logo.png';

import {
  FaShareAlt,
  FaChevronDown,
  FaTwitter,
  FaIdCard,
} from 'react-icons/fa';
import Header from './Header';
import Footer from "./Footer";
import CardPreview from './CardPreview';
import Design from './Design';
import Fill from "./Fill";
import Share from "./Share";
function App() {
  //TODO: add twitter link to the ls
  //TODO: tenemos un error de id repetido
  const handleForm = (e) => {
    e.preventDefault();
  }
  // const [dataCard, setDataCard] = useState({});
  const [toggleCard, setToggleCard] = useState(false);

  const [toggleForm, setToggleForm] = useState('design');

  const [dataResult, setDataResult] = useState({});

  const [person, setPerson] = useState(ls.get('fullObject', {
    palette: '1',
    name: '',
    job: '',
    email: '',
    phone: '',
    github: '',
    linkedin: '',
    photo: 'http://placekitten.com/200/300',
  }));

  // const handleCreateCard = (e) => {


  // }

  const renderShareCode = () => {
    if (toggleCard === true) {
      return (
        <>
          <div className="created">
            <h4 className="created__title">La tarjeta ha sido creada:</h4>
            {dataResult.success ? <a href={dataResult.cardURL} className="created__link" target="_blank" rel="noreferrer">Aquí tienes tu link: {dataResult.cardURL} </a> : `Por cada campo vacío, un gatito llora`}
            <a href="#" className="twitter" target="_blank" rel="noreferrer">
              <FaTwitter></FaTwitter>
              Compartir en twitter
            </a>
          </div>
        </>
      );
    }
  }


  const handleToggleForm = (value) => {
    setToggleForm(value);
  };

  const handleClick = (e) => {
    e.preventDefault();

    console.log('mehanclickao');
    setToggleCard(!toggleCard);

    dataApi(person).then((data) =>
      setDataResult(data));

  };

  const handleInput = (e) => {
    const inputValue = e.target.value;
    const inputName = e.target.name;
    setPerson({ ...person, [inputName]: inputValue });
    console.log(inputName);
    console.log(inputValue);
    ls.set('fullObject', person);
    // const classApp = (name === 'MariCarmen') ? 'palette1' : '';
  };

  let selectedPalette = 'palette1';
  if (person.palette === '2') {
    selectedPalette = 'palette2';
  } else if (person.palette === '3') {
    selectedPalette = 'palette3';
  } else {
    selectedPalette = 'palette1';
  }

  const handleReset = () => {
    setPerson({
      palette: '1',
      name: '',
      job: '',
      email: '',
      phone: '',
      github: '',
      linkedin: '',
      photo: '',
    });
    ls.clear();
  };
  return (
    <>
      <Header />
      <main className={`main-create ${selectedPalette}`}>
      <CardPreview
          handleReset={handleReset}
          selectedPalette={selectedPalette}
          person={person}/>
   
        <form method="get" action="" className="form" onSubmit={handleForm}>
          {/* {/*<!--aquí va el link en js -->/ */}

          <Design
            handleToggleForm={handleToggleForm} person={person
            } toggleForm={toggleForm}
            handleInput={handleInput} />

          {/*<!------------------------RELLENA------------------------------------>*/}
            <Fill
              handleToggleForm={handleToggleForm} person={person
              } handleInput={handleInput} toggleForm={toggleForm}/>
              
          {/*<!------------------------COMPARTE------------------------------------>*/}
          <Share
              handleToggleForm={handleToggleForm} person={person
              } handleInput={handleInput} toggleForm={toggleForm}/>
         
        </form>
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;
