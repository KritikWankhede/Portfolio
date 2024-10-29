document.getElementById('view-projects').addEventListener('click', function() {
    document.querySelector('#projects').scrollIntoView({
        behavior: 'smooth'
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll('.animate-on-scroll');
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active'); // Remove the class when it scrolls out of view
        }
      });
    }, {
      threshold: 0.1 // Adjust to control when animation triggers
    });
  
    sections.forEach(section => {
      observer.observe(section);
    });
  });

  document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(this); // Get form data

    fetch('/send', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            return response.text(); // Return response as text if successful
        }
        throw new Error('Network response was not ok.');
    })
    .then(data => {
        document.getElementById('formResponse').style.display = 'block';
        document.getElementById('formResponse').innerHTML = 'Message sent successfully!';
        this.reset(); // Reset the form fields after submission
    })
    .catch(error => {
        document.getElementById('formResponse').style.display = 'block';
        document.getElementById('formResponse').innerHTML = 'Error sending message: ' + error.message;
    });
});

