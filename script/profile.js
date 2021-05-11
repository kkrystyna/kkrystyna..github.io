window.onload = () => {
    let currUser = null;

    try {
        currUser = JSON.parse(sessionStorage.getItem('loggedUser'));
    } catch (err) {
        sessionStorage.clear();
        window.location.href = 'login.html';
    }

    document.querySelector('#firstName').innerHTML = currUser.first_name;
    document.querySelector('#lastName').innerHTML = currUser.last_name;
    document.querySelector('#email').innerHTML = currUser.email;
    document.querySelector('#phNum').innerHTML = currUser.phone_num;
    document.querySelector('#userRole').innerHTML = currUser.role.slice(9);

    document.querySelector('#deleteButt').addEventListener('click', function (e) {
        e.preventDefault();

        fetch('http://localhost:5000/users', {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: JSON.parse(sessionStorage.getItem('loggedUser')).email,
            }),
        }).then((response) => {
            if (response.ok) {
                window.location.href = 'login.html';
            } else if (response.status === 404) {
                alert('Account does not exist');
            } else {
                alert('Unknown error occurred');
                sessionStorage.clear();
                window.location.href = 'login.html';
            }
            return response.text();
        }).then((data) => {
            console.log(data);
            sessionStorage.clear();
            window.location.href = 'login.html';
        });
    });

    document.querySelector('#logoutButton').addEventListener('click', (e) => {
        e.preventDefault();
        sessionStorage.clear();
        window.location.href = 'login.html';
    });
};
