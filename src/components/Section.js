import React from 'react';
import '../css/Section.css';
import DivRow from './DivRow';

function Section({children, setFlexDirection, altClasses}) {
    return (
        <section className="section">
            <div className="container-fluid">
                <DivRow setFlexDirection={setFlexDirection} altClasses={altClasses}>
                    {children}
                </DivRow>
            </div>
        </section>
    );
}

export default Section;