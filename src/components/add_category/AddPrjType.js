import React from 'react'

function AddPrjType() {
  return (
    <div className='AddProjectType Common'>
        <div className="title">
            Add Project Type
        </div>

        <form action="">
            <div>Name</div>
            <input type="text" />

            <div>Description</div>
            <input type="text" />

            <div>Priority Number</div>
            <input type="text" />

            <div>Status</div>
            <select name="" id="">
                <option value="active">ACTIVE</option>
                <option value="inactive">INACTIVE</option>
            </select>

            <button className='btn-add-prj'>
                Add
            </button>
        </form>
    </div>
  )
}

export default AddPrjType