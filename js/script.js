/* =========================================================
   CLEARPAY — MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       01. MOBILE NAVIGATION
    ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const mobileNav =
        document.getElementById("mobileNav");


    if (menuToggle && mobileNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                mobileNav.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

        });


        /* Close menu when a link is clicked */

        mobileNav.querySelectorAll("a")
            .forEach((link) => {

                link.addEventListener("click", () => {

                    mobileNav.classList.remove("open");

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuToggle.setAttribute(
                        "aria-label",
                        "Open navigation menu"
                    );

                });

            });

    }


    /* =====================================================
       02. THEME TOGGLE + LOCAL STORAGE
    ===================================================== */

    const themeToggle =
        document.getElementById("themeToggle");


    const savedTheme =
        localStorage.getItem("clearpay-theme");


    if (savedTheme === "dark") {

        document.body.classList.add("dark");

    }


    function updateThemeIcon() {

        if (!themeToggle) return;

        const isDark =
            document.body.classList.contains("dark");

        themeToggle.textContent =
            isDark ? "☀" : "☾";

        themeToggle.setAttribute(
            "aria-label",
            isDark
                ? "Switch to light mode"
                : "Switch to dark mode"
        );

    }


    updateThemeIcon();


    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("dark");


            const isDark =
                document.body.classList.contains("dark");


            localStorage.setItem(
                "clearpay-theme",
                isDark ? "dark" : "light"
            );


            updateThemeIcon();

        });

    }


    /* =====================================================
       03. INTERSECTION OBSERVER
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if (
        revealElements.length &&
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "is-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );


        revealElements.forEach((element) => {

            observer.observe(element);

        });

    }


    /* =====================================================
       04. FEATURE FILTER
    ===================================================== */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const featureCards =
        document.querySelectorAll(".feature-card");


    if (
        filterButtons.length &&
        featureCards.length
    ) {

        filterButtons.forEach((button) => {

            button.addEventListener("click", () => {

                const selectedCategory =
                    button.dataset.filter;


                filterButtons.forEach((btn) => {

                    btn.classList.remove("active");

                });


                button.classList.add("active");


                featureCards.forEach((card) => {

                    const category =
                        card.dataset.category;


                    if (
                        selectedCategory === "all" ||
                        category === selectedCategory
                    ) {

                        card.classList.remove("hidden");

                    } else {

                        card.classList.add("hidden");

                    }

                });

            });

        });

    }


    /* =====================================================
       05. REAL-TIME PRICING CALCULATOR
    ===================================================== */

    const volumeInput =
        document.getElementById("volume");

    const volumeValue =
        document.getElementById("volumeValue");

    const planSelect =
        document.getElementById("plan");

    const estimatedCost =
        document.getElementById("estimatedCost");


    const pricingRates = {

        starter: 0.029,

        growth: 0.024,

        scale: 0.019

    };


    function updatePricing() {

        if (
            !volumeInput ||
            !volumeValue ||
            !planSelect ||
            !estimatedCost
        ) {

            return;

        }


        const volume =
            Number(volumeInput.value);


        const selectedPlan =
            planSelect.value;


        const rate =
            pricingRates[selectedPlan];


        const processingFee =
            volume * rate;


        volumeValue.textContent =
            volume.toLocaleString();


        estimatedCost.textContent =
            "$" +
            processingFee.toLocaleString(
                "en-US",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            );

    }


    if (
        volumeInput &&
        planSelect
    ) {

        volumeInput.addEventListener(
            "input",
            updatePricing
        );


        planSelect.addEventListener(
            "change",
            updatePricing
        );


        updatePricing();

    }


    /* =====================================================
       06. CONTACT FORM VALIDATION
    ===================================================== */

    const contactForm =
        document.getElementById("contactForm");


    if (contactForm) {

        const firstName =
            document.getElementById("firstName");

        const lastName =
            document.getElementById("lastName");

        const email =
            document.getElementById("email");

        const subject =
            document.getElementById("subject");

        const message =
            document.getElementById("message");

        const consent =
            document.getElementById("consent");

        const formSuccess =
            document.getElementById("formSuccess");


        function showError(
            input,
            errorId,
            text
        ) {

            input.classList.add("invalid");

            document.getElementById(
                errorId
            ).textContent = text;

        }


        function clearError(
            input,
            errorId
        ) {

            input.classList.remove("invalid");

            document.getElementById(
                errorId
            ).textContent = "";

        }


        function validEmail(value) {

            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                .test(value);

        }


        contactForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                let valid = true;


                /* First name */

                if (
                    firstName.value.trim().length < 2
                ) {

                    showError(
                        firstName,
                        "firstNameError",
                        "Please enter your first name."
                    );

                    valid = false;

                } else {

                    clearError(
                        firstName,
                        "firstNameError"
                    );

                }


                /* Last name */

                if (
                    lastName.value.trim().length < 2
                ) {

                    showError(
                        lastName,
                        "lastNameError",
                        "Please enter your last name."
                    );

                    valid = false;

                } else {

                    clearError(
                        lastName,
                        "lastNameError"
                    );

                }


                /* Email */

                if (
                    !validEmail(
                        email.value.trim()
                    )
                ) {

                    showError(
                        email,
                        "emailError",
                        "Please enter a valid email address."
                    );

                    valid = false;

                } else {

                    clearError(
                        email,
                        "emailError"
                    );

                }


                /* Subject */

                if (!subject.value) {

                    showError(
                        subject,
                        "subjectError",
                        "Please select an option."
                    );

                    valid = false;

                } else {

                    clearError(
                        subject,
                        "subjectError"
                    );

                }


                /* Message */

                if (
                    message.value.trim().length < 10
                ) {

                    showError(
                        message,
                        "messageError",
                        "Message must contain at least 10 characters."
                    );

                    valid = false;

                } else {

                    clearError(
                        message,
                        "messageError"
                    );

                }


                /* Consent */

                const consentError =
                    document.getElementById(
                        "consentError"
                    );


                if (!consent.checked) {

                    consentError.textContent =
                        "Please confirm before submitting.";

                    valid = false;

                } else {

                    consentError.textContent = "";

                }


                /* Success */

                if (valid) {

                    formSuccess.textContent =
                        "✓ Thank you! Your message has been received.";

                    contactForm.reset();

                } else {

                    formSuccess.textContent = "";

                }

            }
        );

    }

});