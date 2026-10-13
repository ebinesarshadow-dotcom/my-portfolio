document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); 

            const formData = {
                name: document.querySelector('input[type="text"]')?.value || '',
                email: document.querySelector('input[type="email"]')?.value || '',
                projectType: document.querySelector('select')?.value || 'General Query',
                message: document.querySelector('textarea')?.value || ''
            };

            // 🔴 பழைய லோக்கல் முகவரிக்குப் பதிலாக Render URL-ஐ மாற்றியுள்ளோம் 👇
            fetch('https://my-backend-server-h8e7.onrender.com/api/register-client', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('உங்கள் தகவல் வெற்றிகரமாகச் சேமிக்கப்பட்டது!');
                    contactForm.reset(); 
                } else {
                    alert('பிழை ஏற்பட்டது: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('சர்வருடன் தொடர்பு கொள்ள முடியவில்லை!');
            });
        });
    }
});

// வலைத்தளப் பாதுகாப்பிற்காக காப்பி மற்றும் ரைட்-கிளிக் செய்வதைத் தடுப்பது
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && (e.key === 'c' || e.key === 'u' || e.key === 's')) {
        e.preventDefault();
    }
});