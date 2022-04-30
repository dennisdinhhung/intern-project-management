import React from 'react'

function AddPrjStatus() {
  return (
    <div className='AddProjectStatus Common'>
        <div className="title">
            Add Project Status
        </div>

        <form action="">
            <div>Name</div>
            <input type="text" />

            <div>Description</div>
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

export default AddPrjStatus