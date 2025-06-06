document.addEventListener('DOMContentLoaded', () => {
    const subjectsGrid = document.getElementById('subjects-grid');

    async function fetchSubjects() {
        // ... (fetchSubjects logic remains the same) ...
        try {
            const response = await fetch('data/subjects.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const subjects = await response.json();
            displaySubjects(subjects);
        } catch (error) {
            console.error("Could not fetch subjects:", error);
            subjectsGrid.innerHTML = '<p>Error loading subjects. Please try again later.</p>';
        }
    }

    function displaySubjects(subjects) {
        // ... (displaySubjects logic remains the same) ...
        if (subjects.length === 0) {
            subjectsGrid.innerHTML = '<p>No subjects found.</p>';
            return;
        }

        subjectsGrid.innerHTML = ''; // Clear loading message

        subjects.forEach(subject => {
            const card = document.createElement('div');
            card.classList.add('subject-card');

            let gradeClass = 'grade';
            if (subject.grade.toLowerCase() === 'in progress') {
                gradeClass += ' in-progress';
            }

            card.innerHTML = `
                <h3>${subject.name}</h3>
                <p><strong>Instructor:</strong> ${subject.instructor || 'N/A'}</p>
                <p><strong>Credits:</strong> ${subject.credits || 'N/A'}</p>
                <p><strong>Grade:</strong> <span class="${gradeClass}">${subject.grade || 'N/A'}</span></p>
                <p>${subject.description || 'No description available.'}</p>
            `;
            subjectsGrid.appendChild(card);
        });
    }

    fetchSubjects();

    // Active navigation link highlighting for SUBJECTS page
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === 'subjects.html') {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});