// DOM Elements
const profileForm = document.getElementById('profileForm');
const editBtn = document.getElementById('editBtn');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');
const profilePicture = document.getElementById('profilePicture');
const editPictureBtn = document.getElementById('editPictureBtn');
const pictureInput = document.getElementById('pictureInput');
const successMessage = document.getElementById('successMessage');
const formInputs = document.querySelectorAll('.form-input');

// Form fields
const fullNameInput = document.getElementById('fullName');
const accountNameInput = document.getElementById('accountName');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const artStyleInput = document.getElementById('artStyle');

// State
let isEditMode = false;
let originalData = {};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProfileData();
    setupEventListeners();
});

// Load profile data from localStorage
function loadProfileData() {
    const savedData = localStorage.getItem('userProfile');
    
    if (savedData) {
        const data = JSON.parse(savedData);
        fullNameInput.value = data.fullName || '';
        accountNameInput.value = data.accountName || '';
        emailInput.value = data.email || '';
        phoneInput.value = data.phone || '';
        artStyleInput.value = data.artStyle || '';
        
        if (data.profilePicture) {
            profilePicture.src = data.profilePicture;
        }
    } else {
        // Set default placeholder data for demo
        fullNameInput.value = 'John Doe';
        accountNameInput.value = '@johndoe_art';
        emailInput.value = 'john.doe@example.com';
        phoneInput.value = '+1 (555) 123-4567';
        artStyleInput.value = 'contemporary';
    }
    
    // Store original data
    saveOriginalData();
    setViewMode();
}

// Save original data for cancel functionality
function saveOriginalData() {
    originalData = {
        fullName: fullNameInput.value,
        accountName: accountNameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        artStyle: artStyleInput.value,
        profilePicture: profilePicture.src
    };
}

// Setup event listeners
function setupEventListeners() {
    editBtn.addEventListener('click', enableEditMode);
    cancelBtn.addEventListener('click', cancelEdit);
    profileForm.addEventListener('submit', handleFormSubmit);
    editPictureBtn.addEventListener('click', () => pictureInput.click());
    pictureInput.addEventListener('change', handlePictureUpload);
}

// Enable edit mode
function enableEditMode() {
    isEditMode = true;
    formInputs.forEach(input => {
        input.disabled = false;
        input.removeAttribute('readonly');
    });
    
    editBtn.style.display = 'none';
    saveBtn.style.display = 'block';
    cancelBtn.style.display = 'block';
    
    // Focus on first input
    fullNameInput.focus();
}

// Set view mode (disable inputs)
function setViewMode() {
    isEditMode = false;
    formInputs.forEach(input => {
        input.disabled = true;
        input.setAttribute('readonly', 'readonly');
    });
    
    editBtn.style.display = 'block';
    saveBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
}

// Cancel edit and restore original data
function cancelEdit() {
    fullNameInput.value = originalData.fullName;
    accountNameInput.value = originalData.accountName;
    emailInput.value = originalData.email;
    phoneInput.value = originalData.phone;
    artStyleInput.value = originalData.artStyle;
    profilePicture.src = originalData.profilePicture;
    
    setViewMode();
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Validate form
    if (!profileForm.checkValidity()) {
        profileForm.reportValidity();
        return;
    }
    
    // Get form data
    const profileData = {
        fullName: fullNameInput.value.trim(),
        accountName: accountNameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        artStyle: artStyleInput.value,
        profilePicture: profilePicture.src
    };
    
    // Save to localStorage
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    
    // Update original data
    saveOriginalData();
    
    // Show success message
    showSuccessMessage();
    
    // Return to view mode
    setViewMode();
}

// Handle profile picture upload
function handlePictureUpload(e) {
    const file = e.target.files[0];
    
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
    }
    
    // Read file and display preview
    const reader = new FileReader();
    reader.onload = (event) => {
        profilePicture.src = event.target.result;
        
        // If in edit mode, update will be saved on form submit
        // If not in edit mode, enable edit mode to allow saving
        if (!isEditMode) {
            enableEditMode();
        }
    };
    reader.onerror = () => {
        alert('Error reading image file');
    };
    reader.readAsDataURL(file);
}

// Show success message
function showSuccessMessage() {
    successMessage.style.display = 'block';
    
    // Hide after 3 seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
}

// Format phone number (optional enhancement)
phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 0) {
        if (value.length <= 3) {
            value = `(${value}`;
        } else if (value.length <= 6) {
            value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        }
    }
    
    e.target.value = value;
});

