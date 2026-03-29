async function loadSubmitter(containerId, numbers, points, balance) {
    const response = await fetch('submitter.html');
    const htmlText = await response.text();
    const container = document.getElementById(containerId);
    container.innerHTML = htmlText;

    // Execute <script> tags from loaded HTML
    const scripts = container.querySelectorAll('script');
    scripts.forEach((script) => {
        const newScript = document.createElement('script');
        if (script.src) {
            newScript.src = script.src;
        } else {
            newScript.textContent = script.textContent;
        }
        document.body.appendChild(newScript);
    });

    // Call initialize function after scripts are loaded
    setTimeout(() => {
        if (typeof initializeSubmitter === 'function') {
            initializeSubmitter(numbers, points, balance);
        } else {
            console.error('initializeSubmitter function not found.');
        }
    }, 100);
}
