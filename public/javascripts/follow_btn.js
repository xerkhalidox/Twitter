const button = document.getElementById("follow");
const whom = document.getElementById("whom").value;

const baseUrl = "http://localhost:3000/";

if (button.innerHTML == '') {
    button.style.display = 'none';
}
const request = (operation, method, innetHTML) => {
    fetch(baseUrl + `${operation}/${whom}`, {
        method: method
    }).then(() => {
        button.innerHTML = innetHTML;
    }).catch((err) => {
        console.log(err);
    });
};

button.addEventListener('click', () => {
    if (button.innerHTML == 'Follow') {
        request('follow', 'post', 'Unfollow');
    } else {
        request('unfollow', 'delete', 'Follow');
    }
});

