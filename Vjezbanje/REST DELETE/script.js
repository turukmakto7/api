document.querySelector('button').addEventListener('click', () => {
    const userId = prompt('Which user ID do you want to delete?'); // Replace with the user ID you want to delete
    const apiUrl = `http://localhost:3000/users/${userId}`;

    const requestOptions = {
        method: 'DELETE',
        headers: {
            // Include any required headers like authentication tokens
        }
    };

    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(`User with ID ${userId} has been deleted successfully.`);
        })
        .catch(error => {
            console.error('Error:', error);
        });
})
