import React from 'react'

function AddProject() {
  return (
    <div className='AddProject'>
        <div className="title-addprj">
            Add Project
        </div>

        <div className="div-form">
            <form action="" className="from-add-prj">
                
                
                {/* <select name="" id="">
                    <option value="upcoming">Upcoming</option>
                    <option value="on-going">On Going</option>
                    <option value="in-review">In Review</option>
                    <option value="pause">Pause</option>
                    <option value="done">Done</option>
                    <option value="cancelled">Cancelled</option>
                </select> */}
                
                <select name="ProjectType" id="">
                    {/* map */}
                </select>

                <select name="ProjectStatus" id="">
                    {/* map */}
                </select>

                <select name="TechStack" id="">
                    {/* map */}
                </select>

                <select name="Department" id="">
                    {/* map */}
                </select>

                {/* Once the Department is chosen, you shold be able to see 
                all members of said department, and select mulitple*/}
                <div className="div-members">
                    <input type="checkbox" />
                </div>

            </form>
        </div>
    </div>
  )
}

export default AddProject