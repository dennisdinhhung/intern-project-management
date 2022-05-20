import React from 'react'
import '../static/css/OutletCommonChild.scss'

function Home() {
  return (
    <div className='Home Common'>
      <div className="title">
        Welcome to NotJira
      </div>

      <div className="div-home">

        <div className='section'>
          <div className="title-2">
            Introduction
          </div>


          <div className='text-section introduction'>
            <img src="NotJira Menu Img.png" alt="Menu Introduction" className='intro-pic' />

            <div>
              <div className='new'>
                Are you new to NotJira?
              </div>

              <div className='text'>
                Not sure where to start? Check out the <span>101 guide</span> here
              </div>
            </div>
          </div>
        </div>

        <div className='section'>
          <div className="title-2">
            Announcement
          </div>

          <div className='text-section'>
            <div>
              There is no announcement
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Home