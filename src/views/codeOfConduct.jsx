import React, { useEffect } from "react";
import "intro.js/introjs.css";
import introJs from "intro.js";

const CodeOfConduct = ({ onAccept }) => {
    useEffect(() => {
        const hasAcceptedCodeOfConduct = () => {
            return localStorage.getItem("codeOfConductAccepted") === "true";
        };

        if (hasAcceptedCodeOfConduct()) {
            onAccept();
        } else {
            const intro = introJs();

            intro.setOptions({
                steps: [
                    {
                        title: "Code of Conduct",
                        intro: `
                    <p>I accept that I will behave when taking part in this project</p>
                    <div class="accept-section">
                        <input type="checkbox" id="code-of-conduct-agree" onclick="toggleAcceptButton()" />
                        <label for="code-of-conduct-agree">I AGREE</label>
                    </div>
                    <button id="code-of-conduct-accept" disabled onclick="handleAcceptClick()">
                        Accept
                    </button>
                `,
                        tooltipClass: "tutorial-card",
                        scrollToElement: false,
                    },
                ],
                exitOnOverlayClick: false,
                showStepNumbers: false,
                showBullets: false,
                showButtons: false,
            });

            intro.start();

            window.toggleAcceptButton = () => {
                const checkbox = document.getElementById(
                    "code-of-conduct-agree"
                );
                const acceptButton = document.getElementById(
                    "code-of-conduct-accept"
                );
                acceptButton.disabled = !checkbox.checked;
            };

            window.handleAcceptClick = () => {
                const checkbox = document.getElementById(
                    "code-of-conduct-agree"
                );
                if (checkbox.checked) {
                    localStorage.setItem("codeOfConductAccepted", true);
                    onAccept();
                    intro.exit();
                }
            };

            return () => {
                delete window.toggleAcceptButton;
                delete window.handleAcceptClick;
            };
        }
    }, [onAccept]);

    return null;
};

export default CodeOfConduct;
