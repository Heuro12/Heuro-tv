document.addEventListener('DOMContentLoaded', () => {
    const localVideo = document.getElementById('localVideo');
    const remoteVideo = document.getElementById('remoteVideo');
    const swapButton = document.getElementById('swapButton');
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    const cameraToggle = document.getElementById('cameraToggle');
    const microphoneToggle = document.getElementById('microphoneToggle');
    const onlineStatus = document.getElementById('onlineStatus');
    const onlineCount = document.getElementById('onlineCount');
    const musicFileInput = document.getElementById('musicFileInput');
    const playMusicButton = document.getElementById('playMusicButton');
    const localMusic = document.getElementById('localMusic');
    const chatContainer = document.querySelector('.chat-container');
    const profilePicElement = document.getElementById('profilePic');
    const usernameElement = document.getElementById('username');
    const locationElement = document.getElementById('location');
    const countryElement = document.getElementById('country');

    let isFrontCamera = true;
    let isMuted = false;
    let stream;

    function startVideoStream() {
        const constraints = {
            video: { facingMode: isFrontCamera ? 'user' : 'environment' },
            audio: !isMuted
        };

        navigator.mediaDevices.getUserMedia(constraints)
            .then(mediaStream => {
                stream = mediaStream;
                localVideo.srcObject = stream;
                localVideo.play();
            })
            .catch(error => {
                handleError(error);
            });
    }

    function handleError(error) {
        console.error('Erro ao acessar a câmera e o microfone', error);
        if (error.name === 'NotAllowedError') {
            alert('Permissão para acessar a câmera e o microfone foi negada. Por favor, permita o acesso nas configurações do seu navegador.');
        } else if (error.name === 'NotFoundError') {
            alert('Nenhum dispositivo de câmera ou microfone foi encontrado.');
        } else {
            alert('Ocorreu um erro ao tentar acessar a câmera e o microfone.');
        }
    }

    function switchCamera() {
        isFrontCamera = !isFrontCamera;
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        startVideoStream();
    }

    function toggleMicrophone() {
        isMuted = !isMuted;
        if (stream) {
            stream.getTracks().forEach(track => {
                if (track.kind === 'audio') {
                    track.enabled = !isMuted;
                }
            });
        }
        console.log(isMuted ? 'Microfone mutado' : 'Microfone ativado');
    }

    function updateOnlineCount() {
        fetch('/api/online-count')
            .then(response => response.json())
            .then(data => {
                onlineCount.textContent = data.count;
            })
            .catch(error => {
                console.error('Erro ao atualizar o número de usuários online:', error);
            });
    }

    function handleMusicFile() {
        const file = musicFileInput.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            localMusic.src = url;
            localMusic.play();
        }
    }

    function synchronizeMusic() {
        // Implementar sincronização de música
    }

    function appendMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');
        messageElement.textContent = message;
        chatContainer.appendChild(messageElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function updateProfile(data) {
        profilePicElement.src = data.profilePicUrl || 'path/to/default/profile/pic.jpg';
        usernameElement.textContent = data.username || 'Username';
        locationElement.textContent = `Location: ${data.location || 'Unknown'}`;
        countryElement.textContent = `Country: ${data.country || 'Unknown'}`;
    }

    function checkAddressUpdateLimit() {
        const lastUpdate = localStorage.getItem('lastAddressUpdate');
        const now = new Date();
        const limit = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

        if (lastUpdate && (now - new Date(lastUpdate) < limit)) {
            alert('Você só pode atualizar o endereço uma vez a cada 30 dias.');
            return false;
        }
        localStorage.setItem('lastAddressUpdate', now.toISOString());
        return true;
    }

    startVideoStream();
    updateOnlineCount();

    playMusicButton.addEventListener('click', () => {
        handleMusicFile();
        synchronizeMusic();
    });

    sendButton.addEventListener('click', () => {
        const message = chatInput.value;
        if (message) {
            appendMessage(`Você: ${message}`);
            chatInput.value = '';
            console.log('Mensagem enviada:', message);
        }
    });

    cameraToggle.addEventListener('click', () => {
        switchCamera();
    });

    microphoneToggle.addEventListener('click', () => {
        toggleMicrophone();
    });

    onlineStatus.addEventListener('click', () => {
        updateOnlineCount();
        console.log('Usuários online atualizados');
    });

    // Simular atualização de perfil (substitua com dados reais do servidor)
    updateProfile({
        profilePicUrl: 'path/to/new/profile/pic.jpg',
        username: 'NewUsername',
        location: 'NewLocation',
        country: 'NewCountry'
    });

    // Toque a música ao carregar a página de login
    const loginMusic = document.getElementById('loginMusic');
    if (loginMusic) {
        loginMusic.play();
    }
});
