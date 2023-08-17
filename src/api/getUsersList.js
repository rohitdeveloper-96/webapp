import { getAllUsers } from "../storage/UsersReducer";
import { getUserDetails } from "../storage/getUserDetailReducer";
export const getUsersList = (dispatch) => {
    fetch('http://localhost:8080/emplist')
        .then((res) => res.json())
        .then((data) => dispatch(getAllUsers(data)))
        .catch((err) => {
            dispatch(getAllUsers(err.message))
        });

}

//Get particular UserList
export  const getUser = (dispatch, id) => {
    fetch(`http://localhost:8080/emplist/${id}`)
        .then((res) => res.json())
        .then((data) => dispatch(getUserDetails(data)))
        .catch((err) => {
            dispatch(getUserDetails(err.message))
        });

}

//POST
export const postUsersList = (userName, userEmail, admin, active, joinedDate, endDate, skill) => {

    fetch("http://localhost:8080/emplist", {

        // Adding method type
        method: "POST",

        // Adding body or contents to send

        body: JSON.stringify({
            name: userName,
            email: userEmail,
            isAdmin: admin,
            active: active,
            poolJoinedDate: joinedDate,
            poolEndDate: endDate,
            primarySkills: skill
        }),

        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

        // Converting to JSON
        .then(response => response.json())

        // Displaying results to console
        .then(json => console.log(json));

}

//Delete
export const deleteUsersList = (id) => {
    fetch(`http://localhost:8080/emplist/${id}`, {
        // Adding method type
        method: "DELETE",
    })

        // Converting to JSON
        .then(response => response.json())

        // Displaying results to console
        .then(json => console.log(json));
}

//PUT
export const updateUsersList = (id, userName, userEmail, admin, active, joinedDate, endDate, skill) => {

    fetch(`http://localhost:8080/emplist/${id}`, {

        // Adding method type
        method: "PUT",

        // Adding body or contents to send
        body: JSON.stringify({
            name: userName,
            email: userEmail,
            isAdmin: admin,
            active: active,
            poolJoinedDate: joinedDate,
            poolEndDate: endDate,
            primarySkills: skill
        }),

        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

        // Converting to JSON
        .then(response => response.json())

        // Displaying results to console
        .then(json => console.log(json));

}