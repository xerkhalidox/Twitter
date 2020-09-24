const notifications_item = document.getElementById("notification");



fetch('/notifications', {
    method: "GET"
}).then(notifications => {
    console.log(notifications);
    if (notifications.length) {
        notifications_item.style.color = "red";
    }
}).catch(err => console.log(err));


