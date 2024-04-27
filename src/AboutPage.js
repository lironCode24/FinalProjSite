import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faUsers, faHandshake, faHeart } from '@fortawesome/free-solid-svg-icons'; // Import the icons you want to use
import './AboutPage.css';
import { faBolt } from '../node_modules/@fortawesome/free-solid-svg-icons/index';

const AboutPage = () => {
    return (
        <div className="about-container">
            <h2><FontAwesomeIcon icon={faTasks} /> The Challenge</h2>
            <p>
                Each contact with a sexual assault support line is urgent, but pinpointing calls that demand immediate
                intervention remains a complex task. Our initiative utilizes advanced sentiment analysis to enhance
                this process, aiming to deliver swift and more nuanced assistance, ensuring individuals affected by
                sexual assault receive the promptest response possible.
            </p>

            <h2><FontAwesomeIcon icon={faHandshake} /> The Solution</h2>
            <p>
                By evaluating the emotional tone within conversations, our system distinguishes the criticality of each
                call. This empowers support staff to prioritize and customize their assistance effectively, offering a
                more refined response to those in dire need.
            </p>

            <h2><FontAwesomeIcon icon={faUsers} /> The Team</h2>
            <p>
                The project was done by Gal Druker and Liron Golan, under the supervision of Dr. Sharon Yalov Handzel.
            </p>

            <h2><FontAwesomeIcon icon={faHeart} /> Collaborations</h2>
            <p>
                Collaborated with Dr. Adi Fux, Shiran Carmeli, and Moriya Greenhut.
            </p>

            <h2><FontAwesomeIcon icon={faBolt} />Acknowledgements</h2>
            <p>
                Special thanks to the <a href="https://www.1202.org.il/local/haifa/about" target="_blank" rel="noopener noreferrer">Support Center for Victims of Sexual Assault in Haifa and the North</a>.
            </p>
        </div>
    );
};

export default AboutPage;
