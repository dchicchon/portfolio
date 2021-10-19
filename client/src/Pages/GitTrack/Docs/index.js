import React from 'react'
import { Nav } from '../Nav'
import { Footer } from '../Footer'
import './style.css'
export const Docs = () => {
    return (
        <>
            <Nav />
            <div id='gittrack-docs'>
                <div className='doc-panel'>
                    <br />
                    <h3>Docs</h3>
                    <p>
                        While using GitTrack, there are several commands you can use 
                    </p>
                    <ul style={{listStyle:'none'}}>
                        <li>
                            {'>'}&nbsp; /roster - get the list of submitted github usernames in your workspace
                        </li>
                        <br/>
                        <li>
                            {'>'}&nbsp; /getgit - get the shorthand commits for this week with the option of checking commit messages and repositories
                        </li>
                        <br/>

                        <li>
                            {'>'}&nbsp; /week-graph - Create a contribution graph of the past week 
                        </li>
                        <br/>

                        <li>
                            {'>'}&nbsp; /month-graph - Create a contribution graph of the past month
                        </li>
                        <br/>

                        <li>
                            {'>'}&nbsp; /add-username - add a username for the current user
                        </li>
                    </ul>

                    <p>
                        To begin using GitTrack in your workspace, your users must submit their Github usernames in the workspace using the command `/add-username`
                    </p>
                </div>  
            </div>
            <Footer />
        </>
    )
}