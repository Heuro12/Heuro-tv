document.addEventListener('DOMContentLoaded', () => {
    const editProfileButton = document.getElementById('editProfileButton');
    const editProfileModal = document.getElementById('editProfileModal');
    const closeButton = document.querySelector('.close-button');
    const editProfileForm = document.getElementById('editProfileForm');
    const profilePic = document.getElementById('profilePic');
    const usernameElement = document.getElementById('username');
    const locationElement = document.getElementById('location');
    const countryElement = document.getElementById('country');

    editProfileButton.addEventListener('click', () => {
        editProfileModal.style.display = 'block';
    });

    closeButton.addEventListener('click', () => {
        editProfileModal.style.display = 'none';
    });

    editProfileForm.addEventListener('submit', (event) => {
        event.preventDefault();

