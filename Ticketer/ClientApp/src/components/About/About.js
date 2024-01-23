import React, { Component } from 'react';
import './About.css';

export class About extends Component {
    static displayName = About.name;

    render() {
        return (
            <div className="about_container">
                <div className="about_left"></div>
                <div className="about_right">
                    <div class="about">
                        <ul className="breadcrumbs">
                            <li className="breadcrumbs_item">
                                <a href="/">Ticketer</a>
                            </li>
                            <li className="breadcrumbs_item_last">About Us</li>
                        </ul>
                        <h2>About Us</h2>
                        <p className="desc">
                            TICKETER - is a project site for buying tickets made in 2024 by students.
                            <br />
                            TICKETER - is a project built on .NET7, React, HTML and CSS and MSSql.
                            <br />
                            Our site is built with modern interface using up to date tools such as .NET7; React v18.2.0; NuGet Packages: EF Core, EF Core SqlServer v7.0.13; Swashbuckle.AspNetCore v6.5.0
                            <br />
                            We hope you will like and appreciate our small project ;)
                            <br />
                            <br />
                        </p>
                        <h2>Our Features:</h2>
                        <ul className="desc">
                            <li>Unique design</li>
                            <li>Movie Cards that look like posters, but when you hover on them it gives you a small description</li>
                            <li>Sidebar with blur effect</li>
                            <li>Easy navigation and User Friendly interface</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
