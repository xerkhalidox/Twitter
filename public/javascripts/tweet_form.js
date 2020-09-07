const form = document.getElementById("tweet_form");
const btn = document.getElementById("form_submit");
btn.addEventListener('click', () => {
    form.submit();
});