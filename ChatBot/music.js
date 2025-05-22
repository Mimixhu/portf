document.addEventListener("DOMContentLoaded", function () {
    // Check if the page was refreshed (reset time)
    if (performance.navigation.type === 1) { // Page refresh detected
        localStorage.removeItem("musicTime");
        localStorage.removeItem("musicPlaying");
    }

    // Create or retrieve the global music player
    if (!window.bgMusic) {
        window.bgMusic = new Audio("LotmOST.mp3");
        window.bgMusic.loop = true;
        window.bgMusic.volume = 0.5;

        // Restore playback position when navigating to index.html
        const savedTime = localStorage.getItem("musicTime");
        if (savedTime && document.location.pathname.includes("index.html")) {
            window.bgMusic.currentTime = parseFloat(savedTime);
        } else {
            window.bgMusic.currentTime = 0; // Start fresh on refresh
        }
    }

    function playMusic() {
        window.bgMusic.play()
            .then(() => {
                console.log("Autoplay started!");
                localStorage.setItem("musicPlaying", "true");
            })
            .catch(error => console.log("Autoplay blocked:", error));
    }

    // 🔥 Autoplay on `welcome.html` (restart on refresh)
    if (document.location.pathname.includes("welcome.html")) {
        playMusic(); // Try autoplay immediately

        // If blocked, start on first user interaction
        document.addEventListener("click", playMusic, { once: true });
    }

    // 🔥 Continue playing music on `index.html` from last position
    if (document.location.pathname.includes("index.html")) {
        if (localStorage.getItem("musicPlaying") === "true") {
            playMusic();
        }
    }

    // Save playback time every second (for navigation persistence)
    setInterval(() => {
        if (!window.bgMusic.paused) {
            localStorage.setItem("musicTime", window.bgMusic.currentTime);
        }
    }, 1000);

    // Music Toggle Button
    const musicToggle = document.getElementById("music-toggle");
    if (musicToggle) {
        musicToggle.addEventListener("click", function () {
            if (window.bgMusic.paused) {
                playMusic();
                musicToggle.textContent = "⏸";
            } else {
                window.bgMusic.pause();
                localStorage.setItem("musicPlaying", "false");
                musicToggle.textContent = "🎵";
            }
        });

        // Update button state
        musicToggle.textContent = window.bgMusic.paused ? "🎵" : "⏸";
    }
    

});

