window.onload = function () {
    const regForm = document.querySelector('#regForm');
    let roleOfUser = 'STUDENT';

    regForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(this);

        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + ', ' + pair[1]);
        // }

        const roleCheckBox = document.getElementsByName('role_choice');
        if (roleCheckBox[1].checked) roleOfUser = 'LECTURER';
        formData.set('role_choice', roleOfUser);

        fetch('http://localhost:5000/users', {
            method: 'POST',
            body: formData,
        }).then((response) => {
            // console.log(response.ok)
            if (response.ok) {
                alert('User was registered');
                window.location.href = 'profile.html';
            } else if (response.status === 403) {
                alert('User already exists');
            } else {
                alert('Invalid data');
            }
            return response.text();
        }).then((data) => {
            console.log(data);
            sessionStorage.setItem('loggedUser', JSON.parse(JSON.stringify(data)));
        });
    });
};
