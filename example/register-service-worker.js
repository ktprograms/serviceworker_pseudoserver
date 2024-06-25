(async function () {
    let message;
    let error = false;
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('/service-worker.js', { type: 'module' });
            if (registration.installing) {
                message = 'Service worker installing';
                console.log(message);
            } else if (registration.waiting) {
                message = 'Service worker installed';
                console.log(message);
            } else if (registration.active) {
                message = 'Service worker active';
                console.log(message);
                return;
            }
        } catch (error) {
            message = `Registration failed with \`${error}\``;
            error = true;
            console.error(message);
        }
    } else {
        message = 'Service worker API not available';
        error = true;
        console.error(message);
    }
    document.body.innerHTML = message + (error ? '' : '<br><br>Reload the page');
})();
