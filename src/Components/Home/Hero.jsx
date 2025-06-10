import React from 'react'
import "./Home.css"
import Typewriter from "typewriter-effect";

const Hero = () => {
  return (
    <div className="hero">
        <div className='inner_hero'>
            <div className="text">
                <p className='hello'>Hello, I'm</p>
                <span className='typewriter'>
                    <Typewriter
                    options={{
                        strings: ["Akanbi Taofik", "A Data Analyst", "A Data Scientist", "An AI Engineer"],
                        autoStart: true,
                        loop: true,
                        delay: 40,
                    }}
                    />
                </span>
                <p className="subtext">A Passionate Data Scientist skilled at working with Python, SQL, Excel and Power BI <br /> Adept at solving business problems and making informed decisions from Data.</p>
            </div>
        </div>
    </div>
  )
}

export default Hero