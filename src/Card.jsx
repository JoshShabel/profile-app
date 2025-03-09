import PropTypes from 'prop-types';
import styles from './Card.module.css'
function Card({ arr, textFilter, job }) {

    let personName = arr[1];
    let personTitle = arr[2];
    let personEmail = arr[4];
    let personBio = arr[3];
    let personImage = arr[5];


    if ((personName !== undefined) && personName.toLowerCase().includes(textFilter.toLowerCase()) && (job === personTitle || job === "None Chosen")) {
        return (
            <div className={styles.cardOneStyle}>
                <div></div>
                <img src={personImage} alt={textFilter} width="250px" height="250px"/>
                <h2>{personName}</h2>
                <h3>{personTitle}</h3>
                <h4>{personEmail}</h4>
                <p>{personBio}</p>
            </div>
        )
    } else {
        return null;
    }

}

Card.propTypes = {
    textFilter: PropTypes.string,
    job: PropTypes.string,
    personName: PropTypes.string,
    personTitle: PropTypes.string,
    personEmail: PropTypes.string,
    personBio: PropTypes.string,
    personImage: PropTypes.string, // url
    arr: PropTypes.array
}

export default Card;