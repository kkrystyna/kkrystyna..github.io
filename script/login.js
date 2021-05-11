window.onload = function () {
    const loginForm = document.querySelector('#loginForm');

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(this);

        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + ', ' + pair[1]);
        // }

        fetch('http://localhost:5000/users/login', {
            method: 'POST',
            body: formData,
        }).then((response) => {
            if (response.ok) {
                alert('Login approved');
                window.location.href = 'profile.html';
            } else if (response.status === 404) {
                alert('User does not exist');
            } else {
                alert('Invalid data');
            }
            return response.text();
        }).then((data) => {
            // console.log(data);
            sessionStorage.setItem('loggedUser', JSON.parse(JSON.stringify(data)));
        });
    });
};
