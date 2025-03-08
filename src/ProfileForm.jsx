/*
import PropTypes from 'prop-types';
*/
import React, {useState} from "react";
/*import styles from './ProfileForm.module.css'*/

function ProfileForm() {
    const [state, setState] = React.useState({
        name: "",
        email: "",
    })

    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', state.name);
        formData.append('email', state.email);
        fetch('/profile-app/src/create-table.php', {
                method: 'POST',
                redirect: 'follow',
            body: new URLSearchParams(formData)
        }
        )
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log('Error:', error));

            fetch('/profile-app/src/send-data.php', {
                method: 'POST',
                    redirect: 'follow',
                    body: new URLSearchParams(formData)
            }
            )
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.log('Error:', error))

    }
    function handleChange(e) {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={state.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={state.email}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Send</button>
            </form>
        </div>

    )
}

ProfileForm.propTypes = {

}

export default ProfileForm;