import {useEffect, useRef, useState} from 'react'
/*import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'*/
import styles from './App.module.css'
import Header from './Header.jsx';
import Introduction from "./Introduction.jsx";
import Wrapper from "./Wrapper.jsx";
import Card from "./Card.jsx";
import Navbar from './Navbar.jsx';
import ProfileForm from "./ProfileForm.jsx";


function App() {
    const [loading, setLoading] = useState(true);
    const [textInput, setTextInput] = useState("");
    const [job, setJob] = useState('None Chosen');
    const [modeToggle, setModeToggle] = useState(true);
    const [formState, setFormState] = useState(0);
 //  const [cards, setCards] = useState([]);
    const cards = useRef(null);
    const handleChange = (event) => {
        setJob(event.target.value);
    };
    const appModeToggleFunction = () => {
        setModeToggle(prevModeToggle => !prevModeToggle);
        console.log(modeToggle);
    }

    function handleFormState() {
setFormState(formState + 1);
        }

    async function fetchData(){
        const response = await fetch("https://web.ics.purdue.edu/~jshabel/fetch-data.php");
        const result = await response.json();
        cards.current = result.map(obj => Object.values(obj));
        setLoading(false);
    }

    useEffect( () => {

        fetchData();
    }, [formState, loading]);

    return (
        <>
            <Navbar modeToggle={modeToggle} setModeToggleFunction={appModeToggleFunction} />
            <div className={modeToggle ? styles.appBodyDark : styles.appBodyLight}>
                <Header headingTitle={"Profile App"}/>
                <Introduction introductionTitle={"About"} introductionDescription={"\n" +
                    "\n" +
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non suscipit nulla, " +
                    "at ultrices lectus. Nam at malesuada neque. Nunc lobortis dignissim turpis, sit amet " +
                    "malesuada justo mattis facilisis. Sed in dignissim risus. Aliquam eget ante tincidunt, " +
                    "ullamcorper risus gravida, tempor ante. Nunc sed elit quis mi pretium tempus in tincidunt " +
                    "arcu. Duis eget varius mauris, sed elementum odio. Donec magna nulla, imperdiet sed " +
                    "fringilla nec, elementum tempor metus. Sed cursus rhoncus purus, nec tincidunt nibh. " +
                    "Suspendisse sed turpis nulla. Mauris egestas efficitur enim. Phasellus porta interdum sem, " +
                    "id vestibulum enim luctus dignissim. Sed venenatis nisl sed justo vulputate ultricies. " +
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. "}/>

                <ProfileForm handleFormState={handleFormState}></ProfileForm>

                <Wrapper>
                    <h4>Options</h4>
                    <p>Below, you can give this individual a name, and choose the background color behind them.</p>
                </Wrapper>

                <label>Choose Job:</label>
                <select value={job} onChange={handleChange}>
                    <option value="None Chosen">None Chosen</option>
                    <option value="Builder">Builder</option>
                    <option value="Engineer">Engineer</option>
                    <option value="Teacher">Teacher</option>
                </select>
                <label>What is their name?</label>
                <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                />
                <button onClick={
                        () => {setTextInput("");setJob("None Chosen");}
                }>Reset</button>
                <div className={modeToggle ? styles.darkCardDisplayArea : styles.lightCardDisplayArea}>
                    {
                        loading ? null : cards.current.map((i, index) => {
                        return (
                            <Card key={index} arr={i} textFilter={textInput} job={job}/>
                        );
                    })}
                </div>
            </div>
            </>
            )
            }

            export default App
