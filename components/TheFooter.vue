<template>
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <p class="copyright">&copy; 2025 Lembaga Administrasi Negara. All rights reserved.</p>
                <div class="footer-links">
                    <a href="#" class="footer-link">Privacy Policy</a>
                    <a href="#" class="footer-link">Terms of Service</a>
                    <a href="#" class="footer-link">Contact Us</a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
// Tidak ada script khusus
</script>

<style scoped>
.footer {
    background: white;
    color: #333;
    padding: 16px 0; /* Reduced from 24px */
    text-align: center;
    border-top: 1px solid #e5e7eb;
    box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.03); /* Lighter shadow */
    font-size: 0.875rem; /* Slightly smaller base font size */
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px; /* Reduced from 20px */
}

.footer-content {
    display: flex;
    flex-direction: column;
    gap: 8px; /* Reduced from 12px */
}

.copyright {
    font-size: 0.8125rem; /* ~13px */
    color: #6b7280;
    margin-bottom: 4px; /* Added small bottom margin */
}

.footer-links {
    display: flex;
    justify-content: center;
    gap: 16px; /* Reduced from 20px */
}

.footer-link {
    color: #4b5563;
    text-decoration: none;
    font-size: 0.8125rem; /* ~13px */
    transition: color 0.15s ease; /* Slightly faster transition */
    padding: 2px 4px; /* Small padding for better click area */
}

.footer-link:hover {
    color: #16578D;
    text-decoration: underline;
}

@media (max-width: 768px) {
    .footer {
        padding: 12px 0; /* Even more compact on mobile */
    }
    .footer-links {
        flex-direction: column;
        gap: 6px; /* Reduced from 8px */
    }
}
</style>